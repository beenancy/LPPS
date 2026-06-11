"use client";

import { deleteStudentAction } from "./actions";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    // Zero-Trust: ถามยืนยันก่อนลบข้อมูลเสมอ ป้องกันการกดผิดพลาด
    const isConfirm = window.confirm("คุณแน่ใจหรือไม่ที่จะลบนักเรียนคนนี้? ข้อมูลจะไม่สามารถกู้คืนได้");
    
    if (isConfirm) {
      const result = await deleteStudentAction(id);
      if (!result.success) {
        alert(result.message);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      className="text-red-600 hover:text-red-900 font-medium bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition"
    >
      ลบ
    </button>
  );
}