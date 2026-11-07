import { hashPassword, verifyPassword } from "./password" ;

describe("hashPassword", () => {
    it("returns a string starting with scrypt:", () => {
      const hash = hashPassword("secret");
      expect(hash.startsWith("scrypt:")).toBe(true);
    });
    it("gives different hashes for the same password:", () => {
        const first = hashPassword("secret");
        const second = hashPassword("secret");
        expect(first).not.toBe(second);
    })
  });

describe("verifyPassword", () => {
  it("returns true for the same password", () => {
    const hash = hashPassword("secret")
    const result = verifyPassword("secret", hash);
    expect(result).toBe(true);
  })

  it("returns false for a different password", () => {
    const hash = hashPassword("secret")
    const result = verifyPassword("hey", hash);
    expect(result).toBe(false);
  })

  it("returns false for wrong format", () => {
    const result = verifyPassword("secret", "hello");
    const result2 = verifyPassword("secret", "");
    const result3 = verifyPassword("secret", undefined);
    expect(result).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
  })


});