import { AbstractAccountRepository } from 'src/modules/iam/domain/repositories/account.abstract-repository';
import { ICreateAccount } from '../../DTOs/create-account.dto';
import { Account } from 'src/modules/iam/domain/aggregates/account.aggregate-root';
import { EmailAddress } from 'src/modules/iam/domain/value-objects/email-address.vo';
import { AbstractHashPassword } from '../../ports/hash-password.abstract';
import { PasswordHash } from 'src/modules/iam/domain/value-objects/password-hash.vo';
import { AccountId } from 'src/modules/iam/domain/value-objects/account-id.vo';
import { v4 as uuidV4 } from 'uuid';
import { EmailAlreadyExistsException } from '../../exceptions/duplicate-email.exception';
import { AbstractPinoLogger } from '../../ports/logger.abstract';

export class CreateAccountUseCase {
  private _accountRepo: AbstractAccountRepository;
  private _HashPassword: AbstractHashPassword;
  private _loggerPort: AbstractPinoLogger;

  constructor(
    accountRepo: AbstractAccountRepository,
    hashPassword: AbstractHashPassword,
    loggerport: AbstractPinoLogger,
  ) {
    this._accountRepo = accountRepo;
    this._HashPassword = hashPassword;
    this._loggerPort = loggerport;
  }

  async execute(body: ICreateAccount): Promise<Account> {
    const { email, password } = body;
    // to mitigate the Boundary Translation between this layer and Domain layer
    const emailVO = EmailAddress.create(email);

    const accountExist = await this._accountRepo.findByEmail(emailVO);

    if (accountExist) {
      throw new EmailAlreadyExistsException(email);
    }

    const hashPWD = await this._HashPassword.hash(password);
    const passwordVO = PasswordHash.create(hashPWD);

    const accountIdVO = AccountId.create(uuidV4());

    const newAccount = await Account.registerNew(
      accountIdVO,
      emailVO,
      passwordVO,
    );

    await this._accountRepo.save(newAccount);

    this._loggerPort.log(
      `User with email ${newAccount.email.getValue} was successfully registered.`,
      'CreateAccountUseCase',
    );
    return newAccount;
  }
}
