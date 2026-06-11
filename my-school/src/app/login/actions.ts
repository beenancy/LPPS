"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(email: string, password: string) {
  try {
    // ให้ NextAuth ตรวจสอบ โดยปิดการ Redirect อัตโนมัติจากฝั่ง Server
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    
    // ถ้ารหัสถูก จะส่งสัญญาณความสำเร็จกลับไปให้หน้าเว็บ
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" };
    }
    // หากพังที่ฐานข้อมูล จะปริ้นท์ Error ลง Terminal ให้เราเห็น
    console.error("System Error Detail:", error);
    return { success: false, message: "ระบบหลังบ้านขัดข้อง (ฐานข้อมูลอาจยังไม่ได้สร้าง)" };
  }
}