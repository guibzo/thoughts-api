import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserByUsernameUseCase } from '@/use-cases/users/get-user-by-username'

export const makeGetUserByUsernameUseCase = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new GetUserByUsernameUseCase(prismaUsersRepository)

  return useCase
}
