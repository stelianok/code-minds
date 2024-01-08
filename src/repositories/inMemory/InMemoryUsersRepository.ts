import { Prisma, User } from "@prisma/client";
import { IUsersRepository } from "../IUsersRepository";

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      title: data.title ?? null,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }
}