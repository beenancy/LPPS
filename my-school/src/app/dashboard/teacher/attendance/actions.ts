"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitAttendance(attendanceData: { studentId: string, status: string }[]) {
  try {
    const teacher = await prisma.user.findFirst({ where: { role: "TEACHER" } });
    if (!teacher) return { success: false, message: "ไม่พบข้อมูลอาจารย์" };

    const course = await prisma.course.upsert({
      where: { code: "MOCK01" }, update: {}, create: { name: "วิชาพื้นฐาน", code: "MOCK01", teacherId: teacher.id }
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await Promise.all(attendanceData.map(async (item) => {
      const existing = await prisma.attendance.findFirst({
        where: { studentId: item.studentId, courseId: course.id, date: { gte: today } }
      });
      if (existing) {
        return prisma.attendance.update({ where: { id: existing.id }, data: { status: item.status } });
      } else {
        return prisma.attendance.create({ data: { studentId: item.studentId, courseId: course.id, teacherId: teacher.id, status: item.status, date: new Date() } });
      }
    }));

    revalidatePath("/dashboard/teacher/attendance");
    return { success: true };
  } catch (error) {
    return { success: false, message: "เกิดข้อผิดพลาดในการบันทึก" };
  }
}