import { DomainException } from '../../domain/exceptions/domain.exception';

export class EmailAlreadyExistsException extends DomainException {
  constructor(email: string) {
    super(`An account with the email '${email}' already exists.`);
  }
}
