const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

/**
 * Robust server-side native fetch utility for Next.js Server Components.
 * Incorporates Next.js caching, automatic deduplication, AbortController timeouts,
 * and try/catch recovery with user-defined fallbacks to handle backend cold starts or failures gracefully.
 */
export async function safeFetch<T>(
  path: string,
  options: RequestInit = {},
  fallback: T,
  timeoutMs: number = 8000
): Promise<T> {
  // Ensure correct slash joins
  const cleanBase = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${cleanBase}${cleanPath}`;

  // Default to 1 hour (3600 seconds) cache unless configured otherwise
  const revalidateTime = parseInt(process.env.NEXT_PUBLIC_REVALIDATE_TIME || "3600", 10);
  
  const mergedOptions: RequestInit = {
    ...options,
    next: {
      revalidate: revalidateTime,
      ...options.next,
    },
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...mergedOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`[safeFetch] API error at ${path}: Status ${res.status} ${res.statusText}`);
      return fallback;
    }

    return (await res.json()) as T;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      console.error(`[safeFetch] Request timeout of ${timeoutMs}ms exceeded for path: ${path}`);
    } else {
      console.error(`[safeFetch] Request failed for path: ${path}. Error:`, error.message || error);
    }
    return fallback;
  }
}
