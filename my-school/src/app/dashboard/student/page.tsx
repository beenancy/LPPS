import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const student = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!student) return <div>ไม่พบข้อมูลนักเรียน</div>;

  const grades = await prisma.grade.findMany({ where: { studentId: student.id }, include: { course: true } });
  const attendances = await prisma.attendance.findMany({ where: { studentId: student.id }, include: { course: true }, orderBy: { date: 'desc' } });

  return (
    <div className="space-y-6">
      <div className="bg-indigo-600 p-6 rounded-xl text-white">
        <h1 className="text-2xl font-bold">สวัสดี, {student.firstName} {student.lastName}</h1>
        <p>รหัส: {student.studentId || "-"} | อีเมล: {student.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-xl font-bold mb-4">📚 ผลการเรียน</h2>
          {grades.length === 0 ? <p>ยังไม่มีเกรด</p> : grades.map(g => (
            <div key={g.id} className="flex justify-between p-3 bg-slate-50 mb-2 rounded">
              <span>{g.course.name}</span>
              <span className="font-bold text-indigo-600">{g.score} / {g.maxScore}</span>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-xl font-bold mb-4">📅 ประวัติเข้าเรียน</h2>
          {attendances.length === 0 ? <p>ยังไม่มีประวัติ</p> : attendances.map(a => (
            <div key={a.id} className="flex justify-between p-3 border-b">
              <span>{new Date(a.date).toLocaleDateString('th-TH')}</span>
              <span className="font-bold">{a.status === "PRESENT" ? "✅ มาเรียน" : a.status === "ABSENT" ? "❌ ขาด" : "⚠️ สาย"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}