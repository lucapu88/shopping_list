import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { connection, onlineFetch, requireConnection, startConnectionMonitor } from '@/utils/connection';

describe('Offline access to online features', () => {
  let stop;
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    connection.notice = '';
    stop = startConnectionMonitor();
  });
  afterEach(() => {
    stop();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('blocks requests offline and shows a dismissible, temporary notice', async () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    expect(requireConnection()).toBe(false);
    expect(connection.notice).toContain('Connessione internet assente');
    await expect(onlineFetch('/generate-recipe', { method: 'POST' })).rejects.toThrow();
    expect(fetch).not.toHaveBeenCalled();
    vi.advanceTimersByTime(6500);
    expect(connection.notice).toBe('');
  });

  it('restores online access when the connection returns', async () => {
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);
    window.dispatchEvent(new Event('offline'));
    requireConnection();
    expect(connection.online).toBe(false);
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    window.dispatchEvent(new Event('online'));
    expect(connection.online).toBe(true);
    expect(connection.notice).toBe('');
    const response = { ok: true };
    const fetch = vi.fn().mockResolvedValue(response);
    vi.stubGlobal('fetch', fetch);
    expect(await onlineFetch('/generate-recipe', { method: 'POST' })).toBe(response);
    expect(fetch).toHaveBeenCalledWith('/generate-recipe', { method: 'POST' });
  });

  it('reports network failures even when the browser believes it is online', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(onlineFetch('/generate-recipe')).rejects.toThrow();
    expect(connection.notice).toContain('Verifica la connessione internet');
  });

  it('does not mistake HTTP errors for a missing internet connection', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    expect((await onlineFetch('/generate-recipe')).status).toBe(500);
    expect(connection.notice).toBe('');
  });
});
