import { InvalidPasswordException } from '../exceptions/invalid-password.exception';

export class PasswordHash {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public static create(hash: string): PasswordHash {
    if (!hash || hash.trim() == '') {
      throw new InvalidPasswordException();
    }

    return new PasswordHash(hash);
  }

  get getValue(): string {
    return this.value;
  }
}
