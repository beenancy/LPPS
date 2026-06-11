"use client";
import { useState } from "react";
import { submitAttendance } from "./actions";

export default function AttendanceForm({ students }: { students: any[] }) {
  const [data, setData] = useState(students.map(s => ({ studentId: s.id, status: "PRESENT" })));
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const res = await submitAttendance(data);
    setLoading(false);
    alert(res.success ? "✅ บันทึกเช็คชื่อเรียบร้อย!" : "❌ " + res.message);
  };

  return (
    <div className="space-y-4">
      {students.map((s, i) => (
        <div key={s.id} className="flex items-center justify-between p-3 border-b">
          <span>{s.firstName} {s.lastName}</span>
          <select 
            className="border p-2 rounded outline-none"
            value={data[i].status}
            onChange={(e) => {
              const newData = [...data];
              newData[i].status = e.target.value;
              setData(newData);
            }}
          >
            <option value="PRESENT">มาเรียน</option>
            <option value="ABSENT">ขาดเรียน</option>
            <option value="LATE">สาย</option>
          </select>
        </div>
      ))}
      <button onClick={handleSave} disabled={loading} className="w-full bg-green-600 text-white p-3 rounded-lg font-bold disabled:opacity-50">
        {loading ? "กำลังบันทึก..." : "บันทึกเช็คชื่อทั้งหมด"}
      </button>
    </div>
  );
}