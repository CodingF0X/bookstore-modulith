import { DomainException } from './domain.exception';

export class InvalidRoleAssignmentException extends DomainException {
  constructor() {
    super('Cannot assign role to a deactivated account.');
  }
}
