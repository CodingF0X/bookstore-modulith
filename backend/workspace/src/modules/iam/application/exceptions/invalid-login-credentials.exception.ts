import { DomainException } from '../../domain/exceptions/domain.exception';

export class InvalidLoginCredentials extends DomainException {
  constructor() {
    super('Invalid Email or Password.');
  }
}
