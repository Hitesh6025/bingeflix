import { PrismaClient } from "@prisma/client";

declare global {
  // This is necessary for module-level augmentation
  var prismadb: PrismaClient | undefined;
}

export {};
