import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenGenerator } from '../../application/ports/token-generate.abstract';
import { JwtPayload } from './jwt/jwt-payload';

@Injectable()
export class JwtTokenGenerator implements TokenGenerator {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(accountId: string, email: string): Promise<string> {
    // The payload is the data embedded inside the JWT
    const jwtPayload: JwtPayload = { sub: accountId, email: email };

    // generate the actual signed token
    return this.jwtService.signAsync(jwtPayload);
  }
}
