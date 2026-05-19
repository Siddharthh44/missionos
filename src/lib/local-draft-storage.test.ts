import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  LOCAL_DRAFT_MAX_AGE_MS,
  LOCAL_DRAFT_VERSION,
  buildDraftKey,
  clearLocalDraft,
  readLocalDraft,
  writeLocalDraft,
} from "@/lib/local-draft-storage";

describe("local-draft-storage", () => {
  const store = new Map<string, string>();

  beforeEach(() => {
    store.clear();
    const storage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    };
    vi.stubGlobal("localStorage", storage);
    vi.stubGlobal("window", { localStorage: storage });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("builds namespaced versioned keys", () => {
    expect(buildDraftKey("mission-create")).toContain("missionos:draft:v1:");
    expect(buildDraftKey("sync", "mission-1")).toContain("sync:mission-1");
  });

  it("round-trips draft envelopes", () => {
    const key = buildDraftKey("test");
    writeLocalDraft(key, { title: "Pipeline" });
    const payload = readLocalDraft<{ title: string }>(key);
    expect(payload?.data.title).toBe("Pipeline");
    expect(payload?.updatedAt).toBeTypeOf("number");
  });

  it("removes invalid JSON safely", () => {
    const key = buildDraftKey("bad-json");
    store.set(key, "{not-json");
    expect(readLocalDraft(key)).toBeNull();
    expect(store.has(key)).toBe(false);
  });

  it("rejects version mismatches", () => {
    const key = buildDraftKey("version");
    store.set(
      key,
      JSON.stringify({ v: LOCAL_DRAFT_VERSION + 9, updatedAt: Date.now(), data: {} }),
    );
    expect(readLocalDraft(key)).toBeNull();
  });

  it("expires stale drafts", () => {
    const key = buildDraftKey("stale");
    store.set(
      key,
      JSON.stringify({
        v: LOCAL_DRAFT_VERSION,
        updatedAt: Date.now() - LOCAL_DRAFT_MAX_AGE_MS - 1,
        data: { note: "old" },
      }),
    );
    expect(readLocalDraft(key)).toBeNull();
  });

  it("clears drafts explicitly", () => {
    const key = buildDraftKey("clear");
    writeLocalDraft(key, "value");
    clearLocalDraft(key);
    expect(readLocalDraft(key)).toBeNull();
  });
});
