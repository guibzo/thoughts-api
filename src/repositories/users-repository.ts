import type { Prisma, User } from '@prisma/client'

export type UsersRepository = {
  create: (data: Prisma.UserCreateInput) => Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
}
