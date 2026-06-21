import { DomainException } from './domain.exception';

export class TokenVersionRevokeException extends DomainException {
  constructor() {
    super('Cannot revoke tokens for a deactivated account.');
  }
}
