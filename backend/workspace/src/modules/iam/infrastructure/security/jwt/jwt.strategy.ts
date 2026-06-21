import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './jwt-payload';
import { AbstractAccountRepository } from 'src/modules/iam/domain/repositories/account.abstract-repository';
import { Account } from 'src/modules/iam/domain/aggregates/account.aggregate-root';
import { AccountId } from 'src/modules/iam/domain/value-objects/account-id.vo';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly accountRepository: AbstractAccountRepository,
    private configService: ConfigService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET must be set in configuration');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<Account> {
    /* 
    Querying a database by a Primary Key (id) is always faster than querying by a secondary unique column (email). 
    Since the JWT payload contains the sub as accountId, we should use it instead of the email.
    */

    const accountId = payload.sub;
    if (!accountId) {
      throw new UnauthorizedException('Invalid token structure');
    }

    const accountIdVO = AccountId.create(accountId);
    const user = await this.accountRepository.findById(accountIdVO);

    if (!user || !user.isActive) {
      throw new UnauthorizedException(
        'Invalid credentials or account is deactivated.',
      );
    }

    if (payload.tokenVersion !== user?.tokenVersion)
      throw new UnauthorizedException('Token has been revoked or is invalid.');

    return user;
  }
}
