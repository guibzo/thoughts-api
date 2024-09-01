import type { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

type GetUserProfileByIdUseCaseParams = {
  userId: string
}

type GetUserProfileByIdUseCaseResponse = {
  user: User
}

export class GetUserProfileByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileByIdUseCaseParams): Promise<GetUserProfileByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
