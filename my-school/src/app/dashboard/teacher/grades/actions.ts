"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitGrades(gradesData: { studentId: string, score: number, maxScore: number }[]) {
  try {
    const teacher = await prisma.user.findFirst({ where: { role: "TEACHER" } });
    if (!teacher) return { success: false, message: "ไม่พบข้อมูลอาจารย์" };

    const course = await prisma.course.upsert({
      where: { code: "MOCK01" }, update: {}, create: { name: "วิชาพื้นฐาน", code: "MOCK01", teacherId: teacher.id }
    });

    await Promise.all(gradesData.map(item =>
      prisma.grade.upsert({
        where: { studentId_courseId_semester: { studentId: item.studentId, courseId: course.id, semester: "1/2569" } },
        update: { score: item.score, maxScore: item.maxScore },
        create: { studentId: item.studentId, courseId: course.id, teacherId: teacher.id, score: item.score, maxScore: item.maxScore, semester: "1/2569" }
      })
    ));

    revalidatePath("/dashboard/teacher/grades");
    return { success: true };
  } catch (error) {
    return { success: false, message: "เกิดข้อผิดพลาดในการบันทึกเกรด" };
  }
}