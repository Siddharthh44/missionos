export const LOCAL_DRAFT_NAMESPACE = "missionos";
export const LOCAL_DRAFT_VERSION = 1;
/** Discard drafts older than 30 days to avoid stale seeded-workflow conflicts. */
export const LOCAL_DRAFT_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export interface LocalDraftEnvelope<T> {
  v: number;
  updatedAt: number;
  data: T;
}

export interface LocalDraftPayload<T> {
  data: T;
  updatedAt: number;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function buildDraftKey(scope: string, draftId?: string): string {
  const segment = draftId ? `${scope}:${draftId}` : scope;
  return `${LOCAL_DRAFT_NAMESPACE}:draft:v${LOCAL_DRAFT_VERSION}:${segment}`;
}

export function readLocalDraft<T>(key: string): LocalDraftPayload<T> | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as LocalDraftEnvelope<T>;

    if (
      !parsed ||
      typeof parsed !== "object" ||
      parsed.v !== LOCAL_DRAFT_VERSION ||
      typeof parsed.updatedAt !== "number" ||
      parsed.data === undefined
    ) {
      window.localStorage.removeItem(key);
      return null;
    }

    if (Date.now() - parsed.updatedAt > LOCAL_DRAFT_MAX_AGE_MS) {
      window.localStorage.removeItem(key);
      return null;
    }

    return { data: parsed.data, updatedAt: parsed.updatedAt };
  } catch {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore quota / privacy mode errors on cleanup.
    }
    return null;
  }
}

export function writeLocalDraft<T>(key: string, data: T): number {
  if (!isBrowser()) {
    return Date.now();
  }

  const updatedAt = Date.now();
  const envelope: LocalDraftEnvelope<T> = {
    v: LOCAL_DRAFT_VERSION,
    updatedAt,
    data,
  };

  try {
    window.localStorage.setItem(key, JSON.stringify(envelope));
  } catch {
    // Storage full or blocked — fail silently to preserve UX.
  }

  return updatedAt;
}

export function clearLocalDraft(key: string): void {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore.
  }
}
