export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">สรุปภาพรวมระบบบริหารจัดการ</h1>
      
      {/* สถิติ Dashboard (Global Architecture Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">จำนวนนักเรียนทั้งหมด</p>
          <p className="text-3xl font-bold text-indigo-600">1,250 คน</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">อาจารย์ผู้สอน</p>
          <p className="text-3xl font-bold text-green-600">45 คน</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm text-slate-500">สถานะการชำระเงินค่าเทอม</p>
          <p className="text-3xl font-bold text-amber-600">85%</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold mb-4">กิจกรรมล่าสุดในระบบ</h2>
        <div className="space-y-4">
          <p className="text-sm text-slate-600 border-l-4 border-indigo-500 pl-4">Admin เพิ่มวิชาเรียนใหม่: คอมพิวเตอร์เบื้องต้น (10:30 น.)</p>
          <p className="text-sm text-slate-600 border-l-4 border-green-500 pl-4">ครูสมชาย บันทึกคะแนนสอบวิชาคณิตศาสตร์ (09:15 น.)</p>
        </div>
      </div>
    </div>
  );
}