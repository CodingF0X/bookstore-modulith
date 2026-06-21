import { DomainException } from '../../domain/exceptions/domain.exception';

export class UnauthorizedException extends DomainException {
  constructor() {
    super('Unauthorized Exception... Account do not exist.');
  }
}
