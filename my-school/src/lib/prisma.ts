import { PrismaClient } from "@prisma/client";

// สถาปัตยกรรม Singleton: ตรวจสอบว่ามีท่อเชื่อมฐานข้อมูลอยู่แล้วหรือไม่
// ถ้ามีให้ใช้ของเดิม ถ้าไม่มีถึงจะสร้างใหม่ (ป้องกันฐานข้อมูลล่ม)
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;