import type { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

type GetUserByUsernameUseCaseParams = {
  username: string
}

type GetUserByUsernameUseCaseResponse = {
  user: User
}

export class GetUserByUsernameUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
  }: GetUserByUsernameUseCaseParams): Promise<GetUserByUsernameUseCaseResponse> {
    const user = await this.usersRepository.findByUsername(username)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
