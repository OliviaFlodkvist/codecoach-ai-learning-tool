import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.member.findUnique({
          where: { email: credentials.email.toLowerCase() },
        });
        if (!user) return null;
        const ok = await bcrypt.compare(credentials.password, user.password);
        if (!ok) return null;
        return {
          id: String(user.id),
          email: user.email,
          name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id;
      return session;
    },
  },
};
export default NextAuth(authOptions);
