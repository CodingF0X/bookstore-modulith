import { Account } from 'src/modules/iam/domain/aggregates/account.aggregate-root';
import { AbstractAccountRepository } from 'src/modules/iam/domain/repositories/account.abstract-repository';
import { AccountId } from 'src/modules/iam/domain/value-objects/account-id.vo';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';

export class GetUserByIdUseCase {
  constructor(private readonly accountRepo: AbstractAccountRepository) {}

  async excecute(accountId: string): Promise<Account> {
    const accountIdVO = AccountId.create(accountId);

    const accountExist = await this.accountRepo.findById(accountIdVO);

    if (!accountExist) throw new UnauthorizedException();

    return accountExist;
  }
}
