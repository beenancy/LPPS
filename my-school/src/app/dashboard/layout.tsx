import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  const userRole = (session.user as any).role;

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar - เมนูคำสั่งระดับ Architect */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-indigo-800">
          🏫 โรงเรียนอัจฉริยะ
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <Link href="/dashboard" className="block p-3 hover:bg-indigo-800 rounded-lg transition text-sm">หน้าแรก</Link>
          
          {userRole === "ADMIN" && (
            <div className="pt-4">
              <p className="text-xs text-indigo-300 uppercase font-bold mb-2">การจัดการผู้ดูแล</p>
              <Link href="/dashboard/admin/teachers" className="block p-3 hover:bg-indigo-800 rounded-lg transition text-sm">จัดการครู</Link>
              <Link href="/dashboard/admin/students" className="block p-3 hover:bg-indigo-800 rounded-lg transition text-sm">จัดการนักเรียน</Link>
            </div>
          )}

          {(userRole === "TEACHER" || userRole === "ADMIN") && (
            <div className="pt-4">
              <p className="text-xs text-indigo-300 uppercase font-bold mb-2">วิชาการ</p>
              <Link href="/dashboard/teacher/attendance" className="block p-3 hover:bg-indigo-800 rounded-lg transition text-sm">เช็คชื่อเข้าเรียน</Link>
              <Link href="/dashboard/teacher/grades" className="block p-3 hover:bg-indigo-800 rounded-lg transition text-sm">ส่งผลการเรียน</Link>
            </div>
          )}
        </nav>
        
        {/* ปุ่ม Logout ที่ปลอดภัย */}
        <div className="p-4 border-t border-indigo-800">
          <form action={async () => { "use server"; await signOut(); }}>
            <button className="w-full bg-red-500 hover:bg-red-600 p-2 rounded-lg text-sm transition">
              ออกจากระบบ
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow overflow-y-auto">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center">
          <span className="text-slate-600 font-medium">สิทธิ์การเข้าถึง: <span className="text-indigo-600">{userRole}</span></span>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-bold text-slate-800">{session.user.name}</span>
            <div className="w-8 h-8 bg-slate-300 rounded-full"></div>
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}