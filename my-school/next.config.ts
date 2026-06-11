import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // บังคับให้ Next.js ไม่ต้องบีบอัดไลบรารีฐานข้อมูล (แก้บั๊ก PrismaClient แครช)
  serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
  
  experimental: {
    serverActions: {
      // ปลดล็อคระบบความปลอดภัยให้รันบน Cloud ของ GitHub Codespaces ได้
      allowedOrigins: [
        "localhost:3000",
        "*.github.dev",
        "*.app.github.dev"
      ]
    }
  }
};

export default nextConfig;