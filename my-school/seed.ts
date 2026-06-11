import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('123456', 10);
  await prisma.user.upsert({ where: { email: 'admin@school.com' }, update: {}, create: { email: 'admin@school.com', passwordHash: hash, firstName: 'Admin', lastName: 'System', role: 'ADMIN' } });
  await prisma.user.upsert({ where: { email: 'teacher@school.com' }, update: {}, create: { email: 'teacher@school.com', passwordHash: hash, firstName: 'สมชาย', lastName: 'ใจดี', role: 'TEACHER' } });
  await prisma.user.upsert({ where: { email: 'student@school.com' }, update: {}, create: { email: 'student@school.com', passwordHash: hash, firstName: 'มานี', lastName: 'เรียนเก่ง', role: 'STUDENT', studentId: '65001' } });
  console.log('✅ สร้างข้อมูลทดสอบสำเร็จ!');
}

main().catch(console.error).finally(() => prisma.$disconnect());