import { DomainException } from './domain.exception';

export class InvalidEmailException extends DomainException {
  readonly code = 'INVALID_EMAIL';

  constructor() {
    super(`Invalid email address format.`);
  }
}
