import { validate as isUUID } from 'uuid';
import { InvalidIdException } from '../exceptions/invalid-id.exception';

export class AccountId {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public static create(id: string): AccountId {
    if (!isUUID(id)) {
      throw new InvalidIdException();
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
