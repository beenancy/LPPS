"use client";
import { useState } from "react";
import { submitGrades } from "./actions";

export default function GradingForm({ students }: { students: any[] }) {
  const [data, setData] = useState(students.map(s => ({ studentId: s.id, score: 0, maxScore: 100 })));
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const res = await submitGrades(data);
    setLoading(false);
    alert(res.success ? "✅ บันทึกเกรดเรียบร้อย!" : "❌ " + res.message);
  };

  return (
    <div className="space-y-4">
      {students.map((s, i) => (
        <div key={s.id} className="flex items-center justify-between p-3 border-b">
          <span>{s.firstName} {s.lastName}</span>
          <div className="flex items-center space-x-2">
            <input 
              type="number" min="0" max="100" 
              className="border p-1 rounded w-20 text-center outline-none"
              value={data[i].score}
              onChange={(e) => {
                const newData = [...data];
                newData[i].score = Number(e.target.value);
                setData(newData);
              }}
            />
            <span>/ 100</span>
          </div>
        </div>
      ))}
      <button onClick={handleSave} disabled={loading} className="w-full bg-indigo-600 text-white p-3 rounded-lg font-bold disabled:opacity-50">
        {loading ? "กำลังบันทึก..." : "บันทึกคะแนนทั้งหมด"}
      </button>
    </div>
  );
}