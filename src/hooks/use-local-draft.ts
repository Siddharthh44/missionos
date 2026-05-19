"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildDraftKey,
  clearLocalDraft,
  readLocalDraft,
  writeLocalDraft,
} from "@/lib/local-draft-storage";

export interface LocalDraftMeta {
  updatedAt: number | null;
  restored: boolean;
}

export interface UseLocalDraftOptions<T> {
  scope: string;
  draftId?: string;
  initialValue: T;
  isEmpty?: (value: T) => boolean;
  debounceMs?: number;
  enabled?: boolean;
  /** Fired once per storage key when a non-empty draft is applied. */
  onRestored?: (updatedAt: number) => void;
  /** Fired once per storage key after the first debounced local save. */
  onSavedLocally?: (updatedAt: number) => void;
}

function loadDraftValue<T>(
  key: string,
  initialValue: T,
  isEmpty: (value: T) => boolean,
  enabled: boolean,
): { value: T; meta: LocalDraftMeta } {
  if (!enabled) {
    return { value: initialValue, meta: { updatedAt: null, restored: false } };
  }

  const payload = readLocalDraft<T>(key);
  if (payload && !isEmpty(payload.data)) {
    return {
      value: payload.data,
      meta: { updatedAt: payload.updatedAt, restored: true },
    };
  }

  return { value: initialValue, meta: { updatedAt: null, restored: false } };
}

export function useLocalDraft<T>({
  scope,
  draftId,
  initialValue,
  isEmpty = () => false,
  debounceMs = 500,
  enabled = true,
  onRestored,
  onSavedLocally,
}: UseLocalDraftOptions<T>) {
  const storageKey = useMemo(
    () => buildDraftKey(scope, draftId),
    [scope, draftId],
  );

  const [{ value, meta }, setState] = useState(() =>
    loadDraftValue(storageKey, initialValue, isEmpty, enabled),
  );

  const hydratedKeyRef = useRef<string | null>(null);
  const restoredKeyRef = useRef<string | null>(null);
  const savedKeyRef = useRef<string | null>(null);
  const skipNextSaveRef = useRef(false);
  const initialValueRef = useRef(initialValue);
  const isEmptyRef = useRef(isEmpty);
  const onRestoredRef = useRef(onRestored);
  const onSavedLocallyRef = useRef(onSavedLocally);

  initialValueRef.current = initialValue;
  isEmptyRef.current = isEmpty;
  onRestoredRef.current = onRestored;
  onSavedLocallyRef.current = onSavedLocally;

  useEffect(() => {
    const loaded = loadDraftValue(
      storageKey,
      initialValueRef.current,
      isEmptyRef.current,
      enabled,
    );
    setState(loaded);
    skipNextSaveRef.current = true;
    hydratedKeyRef.current = storageKey;

    if (
      loaded.meta.restored &&
      restoredKeyRef.current !== storageKey &&
      onRestoredRef.current
    ) {
      restoredKeyRef.current = storageKey;
      onRestoredRef.current(loaded.meta.updatedAt ?? Date.now());
    }
  }, [storageKey, enabled]);

  useEffect(() => {
    if (!enabled || hydratedKeyRef.current !== storageKey) {
      return;
    }

    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    if (isEmptyRef.current(value)) {
      clearLocalDraft(storageKey);
      setState((current) => ({
        ...current,
        meta: { updatedAt: null, restored: false },
      }));
      return;
    }

    const timer = window.setTimeout(() => {
      const updatedAt = writeLocalDraft(storageKey, value);
      setState((current) => ({
        ...current,
        meta: { ...current.meta, updatedAt, restored: false },
      }));

      if (savedKeyRef.current !== storageKey && onSavedLocallyRef.current) {
        savedKeyRef.current = storageKey;
        onSavedLocallyRef.current(updatedAt);
      }
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [value, storageKey, enabled, debounceMs]);

  const setValue = useCallback((next: T | ((prev: T) => T)) => {
    setState((current) => ({
      ...current,
      value: typeof next === "function" ? (next as (prev: T) => T)(current.value) : next,
    }));
  }, []);

  const patchValue = useCallback((partial: Partial<T>) => {
    setState((current) => ({
      ...current,
      value: { ...current.value, ...partial },
    }));
  }, []);

  const clearDraft = useCallback(() => {
    clearLocalDraft(storageKey);
    skipNextSaveRef.current = true;
    setState({
      value: initialValue,
      meta: { updatedAt: null, restored: false },
    });
  }, [storageKey, initialValue]);

  return {
    value,
    setValue,
    patchValue,
    clearDraft,
    meta,
    storageKey,
  };
}
