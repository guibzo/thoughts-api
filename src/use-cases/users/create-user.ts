import type { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserEmailAlreadyExistsError } from '../_errors/user-email-already-exists-error'

type CreateUserUseCaseParams = {
  name: string
  username: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    username,
    password,
  }: CreateUserUseCaseParams): Promise<CreateUserUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userEmailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userEmailAlreadyExists) {
      throw new UserEmailAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      username,
      password_hash: passwordHash,
    })

    return {
      user,
    }
  }
}
