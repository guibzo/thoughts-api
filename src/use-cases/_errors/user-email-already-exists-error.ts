export class UserEmailAlreadyExistsError extends Error {
  constructor() {
    super('E-mail já existente.')
  }
}
