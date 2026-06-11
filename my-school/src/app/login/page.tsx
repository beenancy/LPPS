"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // ตัวแปรสำหรับจัดการการเปลี่ยนหน้า

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await loginAction(email, password);
      
      if (result.success) {
        // ถ้ารหัสผ่านถูกต้อง ให้พาไปหน้า Dashboard ทันที
        router.push("/dashboard");
        router.refresh();
      } else {
        // ถ้ารหัสผิด ให้แสดงข้อความเตือน
        setError(result.message || "การเข้าสู่ระบบล้มเหลว");
        setLoading(false);
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96 border border-slate-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-900">🏫 ระบบโรงเรียนมาตรฐาน</h2>
        
        {error && (
          <div className="p-3 mb-4 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">อีเมล</label>
            <input 
              className="w-full p-3 border rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
              type="email" 
              placeholder="admin@school.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">รหัสผ่าน</label>
            <input 
              className="w-full p-3 border rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none text-sm" 
              type="password" 
              placeholder="******" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 mt-6 rounded-lg hover:bg-indigo-700 font-semibold transition disabled:opacity-50 text-sm"
        >
          {loading ? "กำลังตรวจสอบข้อมูลความปลอดภัย..." : "เข้าสู่ระบบ"}
        </button>
      </form>
    </div>
  );
}