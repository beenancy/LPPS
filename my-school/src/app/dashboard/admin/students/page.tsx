import prisma from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default async function ManageStudentsPage() {
  // ดึงข้อมูลผู้ใช้งานที่มีสิทธิ์เป็น "STUDENT" จากฐานข้อมูล
  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { createdAt: "desc" }, // เรียงจากคนที่เพิ่มล่าสุดขึ้นก่อน
  });

  return (
    <div className="space-y-6">
      {/* ส่วนหัวของหน้าจอ */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">จัดการข้อมูลนักเรียน</h1>
          <p className="text-sm text-slate-500 mt-1">ระบบเพิ่ม ลบ แก้ไข และดูรายชื่อนักเรียนทั้งหมดในสถาบัน</p>
        </div>
        <Link href="/dashboard/admin/students/add" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
          + เพิ่มนักเรียนใหม่
        </Link>
      </div>

      {/* ตารางแสดงข้อมูล */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
              <th className="p-4 font-semibold">รหัสนักเรียน</th>
              <th className="p-4 font-semibold">ชื่อ - นามสกุล</th>
              <th className="p-4 font-semibold">อีเมล</th>
              <th className="p-4 font-semibold">วันที่สมัคร</th>
              <th className="p-4 font-semibold text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  ไม่พบข้อมูลนักเรียนในระบบ
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 text-sm font-medium text-slate-900">
                    {student.studentId || "-"}
                  </td>
                  <td className="p-4 text-sm text-slate-700">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="p-4 text-sm text-slate-500">
                    {student.email}
                  </td>
                  <td className="p-4 text-sm text-slate-500">
                    {new Date(student.createdAt).toLocaleDateString("th-TH")}
                  </td>
                  <td className="p-4 text-sm text-center space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900 font-medium bg-indigo-50 px-3 py-1 rounded">แก้ไข</button>
                    <DeleteButton id={student.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}