import { validate as isUUID } from 'uuid';

export class AccountId {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public static create(id: string): AccountId {
    if (!isUUID) {
      throw new Error('Invalid Account ID format. Must be a UUID.');
    }

    return new AccountId(id);
  }

  public equals(other: AccountId): boolean {
    return this.value == other.value;
  }

  get getValue(): string {
    return this.value;
  }
}
