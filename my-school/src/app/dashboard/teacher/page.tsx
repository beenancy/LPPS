import { auth } from "@/auth";

export default async function TeacherDashboard() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-indigo-900 mb-2">
          ยินดีต้อนรับ, อาจารย์ {session?.user?.name}
        </h1>
        <p className="text-slate-600">
          นี่คือศูนย์กลางการจัดการเรียนการสอน คุณสามารถเช็คชื่อและบันทึกผลการเรียนได้จากเมนูด้านซ้ายมือ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h3 className="font-bold text-indigo-800 mb-2">📅 ตารางสอนวันนี้</h3>
          <p className="text-sm text-indigo-600">ยังไม่มีข้อมูลตารางสอน</p>
        </div>
        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
          <h3 className="font-bold text-green-800 mb-2">📝 ภาระงานที่ต้องทำ</h3>
          <p className="text-sm text-green-600">ยังไม่มีงานค้าง</p>
        </div>
      </div>
    </div>
  );
}