import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from './jwt-payload';
import { AbstractAccountRepository } from 'src/modules/iam/domain/repositories/account.abstract-repository';
import { Account } from 'src/modules/iam/domain/aggregates/account.aggregate-root';
import { EmailAddress } from 'src/modules/iam/domain/value-objects/email-address.vo';

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
    const email = payload.email;
    if (!email) {
      throw new UnauthorizedException('Invalid token');
    }

    const emailVO = EmailAddress.create(email);
    const user = await this.accountRepository.findByEmail(emailVO);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
