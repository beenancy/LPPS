import prisma from "@/lib/prisma";
import AttendanceForm from "./AttendanceForm";

export default async function AttendancePage() {
  const students = await prisma.user.findMany({ where: { role: "STUDENT" } });
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h1 className="text-2xl font-bold mb-4">เช็คชื่อเข้าเรียน</h1>
      <AttendanceForm students={students} />
    </div>
  );
}