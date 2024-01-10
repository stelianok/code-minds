import { Prisma } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements IUsersRepository {
  findById(id: string): Promise<{ id: string; name: string; title: string | null; email: string; password: string; created_at: Date; } | null> {
    throw new Error("Method not implemented.");
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    return user;
  }
}