"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function addStudentAction(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const studentId = formData.get("studentId") as string;
  const password = formData.get("password") as string;

  // Zero-Trust Validation: ตรวจสอบว่ากรอกข้อมูลครบหรือไม่
  if (!firstName || !lastName || !email || !studentId || !password) {
    return { success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" };
  }

  try {
    // เข้ารหัสผ่านก่อนบันทึกลงฐานข้อมูล (Security Best Practice)
    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึกข้อมูลลง SQLite
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        studentId,
        passwordHash: hashedPassword,
        role: "STUDENT",
      },
    });

    // สั่งให้ Next.js รีเฟรชข้อมูลในหน้าตารางใหม่ทันที
    revalidatePath("/dashboard/admin/students");
    return { success: true };
    
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, message: "อีเมลหรือรหัสนักเรียนนี้มีในระบบแล้ว" };
  }
}
// ฟังก์ชันลบข้อมูลนักเรียน
export async function deleteStudentAction(id: string) {
  try {
    await prisma.user.delete({
      where: { id: id },
    });
    
    // สั่งให้รีเฟรชตารางใหม่
    revalidatePath("/dashboard/admin/students");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, message: "ไม่สามารถลบข้อมูลได้" };
  }
}