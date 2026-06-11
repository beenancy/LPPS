import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // ค้นหาผู้ใช้จากฐานข้อมูล SQLite ของเรา
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          });

          if (!user) return null;

          // ตรวจสอบความปลอดภัยของรหัสผ่านที่ถูกแฮชเอาไว้
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          );

          if (!isPasswordValid) return null;

          return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication DB error:", error);
          return null;
        }
      },
    }),
  ],
});