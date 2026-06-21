import { AbstractAccountRepository } from 'src/modules/iam/domain/repositories/account.abstract-repository';
import { AccountId } from 'src/modules/iam/domain/value-objects/account-id.vo';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';

export class LogoutUseCase {
  constructor(private readonly accountRepo: AbstractAccountRepository) {}

  async execute(accountId: string): Promise<void> {
    const accountIdVO = AccountId.create(accountId);
    const accountExist = await this.accountRepo.findById(accountIdVO);

    if (!accountExist) throw new UnauthorizedException();

    accountExist.revokeToken();

    await this.accountRepo.save(accountExist);
  }
}
