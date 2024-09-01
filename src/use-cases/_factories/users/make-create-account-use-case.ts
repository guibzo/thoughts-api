import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateAccountUseCase } from '@/use-cases/auth/create-account'

export const makeCreateAccountUseCase = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new CreateAccountUseCase(prismaUsersRepository)

  return useCase
}
