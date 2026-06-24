import { Account } from 'src/modules/iam/domain/aggregates/account.aggregate-root';
import { AbstractAccountRepository } from 'src/modules/iam/domain/repositories/account.abstract-repository';
import { EmailAddress } from 'src/modules/iam/domain/value-objects/email-address.vo';
import { NotFoundAccountException } from '../../exceptions/not-found-account.exception';

export class GetUserByEmailUseCase {
  constructor(private readonly accountRepo: AbstractAccountRepository) {}

  async execute(body: string): Promise<Account> {
    const emailVO = EmailAddress.create(body);

    const accountExists = await this.accountRepo.findByEmail(emailVO);

    if (!accountExists) throw new NotFoundAccountException();

    const { id, email, passwordHash, isActive, lastLogin, role, tokenVersion } =
      accountExists;

    return Account.loadExisting(
      id,
      email,
      passwordHash,
      isActive,
      lastLogin,
      role,
      tokenVersion,
    );
  }
}
