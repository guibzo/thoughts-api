import type { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { PasswordInsecureError } from '../_errors/password-insecure-error'
import { UserEmailAlreadyExistsError } from '../_errors/user-email-already-exists-error'
import { UserUsernameAlreadyExistsError } from '../_errors/user-username-already-exists-error'

type CreateAccountUseCaseParams = {
  name: string
  username: string
  email: string
  password: string
}

type CreateAccountUseCaseResponse = {
  user: User
}

export class CreateAccountUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    name,
    username,
    password,
  }: CreateAccountUseCaseParams): Promise<CreateAccountUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userEmailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userEmailAlreadyExists) {
      throw new UserEmailAlreadyExistsError()
    }

    const userUsernameAlreadyExists = await this.usersRepository.findByUsername(username)

    if (userUsernameAlreadyExists) {
      throw new UserUsernameAlreadyExistsError()
    }

    const passwordSchema = z
      .string()
      .min(8)
      .refine((password) => /[a-z]/i.test(password) && /\d/.test(password) && /\W/.test(password))

    const isPasswordInsecure = passwordSchema.safeParse(password)

    if (!isPasswordInsecure.success) {
      throw new PasswordInsecureError()
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
