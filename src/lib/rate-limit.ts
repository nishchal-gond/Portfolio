/**
 * Best-effort in-memory rate limiter (per serverless instance, so not a hard
 * guarantee). For strict limits, swap for Upstash Ratelimit / Vercel KV.
 */
export function createRateLimiter({ max, windowMs }: { max: number; windowMs: number }) {
  const hits = new Map<string, number[]>();

  return function isRateLimited(key: string) {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > 1000) {
      hits.forEach((times, k) => {
        if (times.every((t) => now - t >= windowMs)) hits.delete(k);
      });
    }
    return recent.length > max;
  };
}

export function getClientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
