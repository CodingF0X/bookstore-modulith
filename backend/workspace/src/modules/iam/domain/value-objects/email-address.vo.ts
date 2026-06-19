import { InvalidEmailException } from '../exceptions/invalid-email.exception';

export class EmailAddress {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public static create(rawEmail: string): EmailAddress {
    const normalizeEmail = rawEmail.trim().toLowerCase();

    if (!this.isValid(normalizeEmail)) {
      throw new InvalidEmailException();
    }

    return new EmailAddress(rawEmail);
  }

  private static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get getValue(): string {
    return this.value;
  }
}
