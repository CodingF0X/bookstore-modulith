import { AbstractAccountRepository } from 'src/modules/iam/domain/repositories/account.abstract-repository';
import { AbstractHashPassword } from '../../ports/hash-password.abstract';
import { AbstractTokenGenerator } from '../../ports/token-generate.abstract';
import { ILoginDTO } from '../../DTOs/login.dto';
import { EmailAddress } from 'src/modules/iam/domain/value-objects/email-address.vo';
import { InvalidLoginCredentials } from '../../exceptions/invalid-login-credentials.exception';
import { AbstractPinoLogger } from '../../ports/logger.abstract';

export class LoginUseCase {
  constructor(
    private readonly accountRepo: AbstractAccountRepository,
    private readonly passwordHash: AbstractHashPassword,
    private readonly tokenGenerator: AbstractTokenGenerator,
    private readonly loggerPort: AbstractPinoLogger,
  ) {}

  async execute(body: ILoginDTO): Promise<{ accessToken: string }> {
    const { email, password } = body;
    const emailVO = EmailAddress.create(email);

    const accountExist = await this.accountRepo.findByEmail(emailVO);

    if (!accountExist) throw new InvalidLoginCredentials();
    if (!accountExist.isActive) throw new InvalidLoginCredentials();

    const passwordValid = await this.passwordHash.compare(
      password,
      accountExist.passwordHash.getValue,
    );

    if (!passwordValid) throw new InvalidLoginCredentials();

    accountExist.updateLastLogin();
    await this.accountRepo.save(accountExist);

    const roles = accountExist.role.map((r) => r.roleName);

    const accessToken = await this.tokenGenerator.generateToken(
      accountExist.id.getValue,
      accountExist.email.getValue,
      roles,
      accountExist.tokenVersion,
    );

    this.loggerPort.log(
      `User with email ${accountExist.email.getValue} has succesfully logged in.`,
    );

    return { accessToken };
  }
}
