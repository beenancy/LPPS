import prisma from "@/lib/prisma";
import GradingForm from "./GradingForm";

export default async function GradesPage() {
  const students = await prisma.user.findMany({ where: { role: "STUDENT" } });
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h1 className="text-2xl font-bold mb-4">ส่งผลการเรียน (ตัดเกรด)</h1>
      <GradingForm students={students} />
    </div>
  );
}