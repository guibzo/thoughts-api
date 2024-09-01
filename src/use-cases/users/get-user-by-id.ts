import type { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

type GetUserByIdUseCaseParams = {
  userId: string
}

type GetUserByIdUseCaseResponse = {
  user: User
}

export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserByIdUseCaseParams): Promise<GetUserByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
