import { DomainException } from '../../domain/exceptions/domain.exception';

export class NotFoundAccountException extends DomainException {
  constructor() {
    super('Account Do not exist.');
  }
}
