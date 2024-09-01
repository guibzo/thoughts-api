export class PasswordInsecureError extends Error {
  constructor() {
    super('A senha deve conter ao menos uma letra, um número e um caractere especial.')
  }
}
