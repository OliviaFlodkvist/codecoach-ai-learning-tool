import fs from "fs";
import path from "path";
import { hashPassword, verifyPassword } from "@/lib/password";

const dataDir = path.join(process.cwd(), "src", "data");
const usersPath = path.join(dataDir, "users.json");

function ensureStore() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(usersPath))
    fs.writeFileSync(usersPath, JSON.stringify([]), "utf-8");
}

export function loadUsers() {
  ensureStore();
  const raw = fs.readFileSync(usersPath, "utf-8");
  return JSON.parse(raw);
}

export function saveUsers(users) {
  ensureStore();
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf-8");
}

export function findUserByEmail(email) {
  const users = loadUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser({ name, surname, email, password, profession }) {
  const users = loadUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Email already in use");
  }
  const user = {
    id: Date.now().toString(36),
    name: name || null,
    surname: surname || null,
    email: email.toLowerCase(),
    password: hashPassword(password),
    profession: profession || null,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  return { id: user.id, email: user.email, name: user.name };
}

export function validatePassword(email, password) {
  const user = findUserByEmail(email);
  if (!user) return null;
  return verifyPassword(password, user.password) ? user : null;
}
