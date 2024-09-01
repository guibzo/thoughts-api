import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserByIdUseCase } from '@/use-cases/users/get-user-by-id'

export const makeGetUserByIdUseCase = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new GetUserByIdUseCase(prismaUsersRepository)

  return useCase
}
