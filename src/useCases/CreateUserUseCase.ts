import { UserAlreadyExistsError } from "@/useCases/errors/UserAlreadyExistsError";
import { IUsersRepository } from "@/repositories/IUsersRepository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface ICreateUserRequest {
  name: string;
  title?: string;
  email: string;
  password: string;
}

interface ICreateUserResponse {
  user: User
}
export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  async execute({ name, email, password }: ICreateUserRequest): Promise<ICreateUserResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash
    })

    return { user }
  }
}