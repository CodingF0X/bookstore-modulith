import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { TokenGenerator } from '../../application/ports/token-generate.abstract';

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
