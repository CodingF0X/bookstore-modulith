import { DomainException } from './domain.exception';

export class InvalidIdException extends DomainException {
  constructor() {
    super(`Invalid Account ID format. Must be a UUID.`);
  }
}
