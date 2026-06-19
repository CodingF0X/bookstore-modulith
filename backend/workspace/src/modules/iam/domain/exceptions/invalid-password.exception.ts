import { DomainException } from './domain.exception';

export class InvalidPasswordException extends DomainException {
  constructor() {
    super('Password hash cannot be empty!');
  }
}
