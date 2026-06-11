"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addStudentAction } from "../actions";

export default function AddStudentPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // สถาปัตยกรรม Controlled State: ควบคุมการพิมพ์ทุกตัวอักษรเพื่อป้องกันหน้าจอค้าง
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    password: "",
    email: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // แปลง State เป็น FormData ก่อนส่งให้ระบบหลังบ้าน
    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submitData.append(key, value);
    });

    const result = await addStudentAction(submitData);

    if (result.success) {
      alert("เพิ่มข้อมูลนักเรียนสำเร็จ!");
      router.push("/dashboard/admin/students");
      router.refresh(); // บังคับให้ตารางอัปเดตข้อมูลใหม่ทันที
    } else {
      setError(result.message || "เกิดข้อผิดพลาด");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/dashboard/admin/students" className="text-slate-500 hover:text-indigo-600 transition font-medium">
          ← กลับไปหน้าจัดการ
        </Link>
        <h1 className="text-2xl font-bold text-slate-800">เพิ่มนักเรียนใหม่</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 font-medium text-center">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ชื่อจริง</label>
            <input 
              type="text" name="firstName" required 
              value={formData.firstName} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-900" 
              placeholder="สมชาย" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">นามสกุล</label>
            <input 
              type="text" name="lastName" required 
              value={formData.lastName} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-900" 
              placeholder="ใจดี" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">รหัสนักเรียน</label>
            <input 
              type="text" name="studentId" required 
              value={formData.studentId} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-900" 
              placeholder="650001" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">รหัสผ่านเริ่มต้น</label>
            <input 
              type="password" name="password" required 
              value={formData.password} onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-900" 
              placeholder="******" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">อีเมลนักเรียน (สำหรับเข้าสู่ระบบ)</label>
          <input 
            type="email" name="email" required 
            value={formData.email} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-slate-900" 
            placeholder="student@school.com" 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 font-semibold transition disabled:opacity-50 text-sm"
        >
          {loading ? "กำลังบันทึกข้อมูล..." : "บันทึกข้อมูลนักเรียน"}
        </button>
      </form>
    </div>
  );
}