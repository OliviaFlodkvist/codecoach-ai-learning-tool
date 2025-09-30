import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

// Hash format: scrypt:<saltHex>:<hashHex>
export function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `scrypt:${salt.toString("hex")}:${hash.toString("hex")}`;
}

export function verifyPassword(password, stored) {
  try {
    const [scheme, saltHex, hashHex] = String(stored).split(":");
    if (scheme !== "scrypt" || !saltHex || !hashHex) return false;
    const salt = Buffer.from(saltHex, "hex");
    const expected = Buffer.from(hashHex, "hex");
    const candidate = scryptSync(password, salt, 64);
    return timingSafeEqual(candidate, expected);
  } catch {
    return false;
  }
}
