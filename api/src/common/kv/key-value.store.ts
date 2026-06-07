// WHY THIS ABSTRACTION EXISTS: Magic-link single-use enforcement (Issue #6) and
// refresh-token invalidation (Issue #1) need a small key/value store with TTLs.
// In production that's Redis — but requiring Redis locally means everyone needs
// Docker or a Redis install. KeyValueStore hides the backend: the default is an
// in-process in-memory store (zero dependencies), and setting REDIS_URL swaps in
// real Redis with no change to the calling code.
//
// Inject KeyValueStore (it's provided globally by CommonModule) and use set/get/
// delete/has. Do NOT import ioredis directly in feature modules — go through this.
export abstract class KeyValueStore {
  /** Store a value, optionally expiring after ttlSeconds. */
  abstract set(key: string, value: string, ttlSeconds?: number): Promise<void>;
  /** Return the value, or null if missing or expired. */
  abstract get(key: string): Promise<string | null>;
  /** Remove a key. */
  abstract delete(key: string): Promise<void>;
  /** True if the key exists and has not expired. */
  abstract has(key: string): Promise<boolean>;
}
