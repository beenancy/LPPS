import type { NextAuthConfig } from "next-auth";

// แยก Config ตัวนี้ออกมาให้ Middleware เรียกใช้ได้ โดยไม่มีการ Import Prisma เข้ามารบกวน
export const authConfig = {
  providers: [], // จะถูกใส่เพิ่มในไฟล์หลักแทน
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string;
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;