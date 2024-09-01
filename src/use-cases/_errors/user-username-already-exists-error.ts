export class UserUsernameAlreadyExistsError extends Error {
  constructor() {
    super('Nome de usuário já existente.')
  }
}
