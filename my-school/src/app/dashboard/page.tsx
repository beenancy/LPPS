import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  // ป้องกัน Type Error ของ TypeScript ด้วยการระบุประเภทข้อมูลแบบปลอดภัย
  const userRole = (session.user as any).role;

  if (userRole === "ADMIN") {
    redirect("/dashboard/admin");
  }
  if (userRole === "TEACHER") {
    redirect("/dashboard/teacher");
  }
  
  redirect("/dashboard/student");
}