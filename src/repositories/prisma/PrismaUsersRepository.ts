import { Prisma } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements IUsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!user) {
      return null;
    }

    return user;
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