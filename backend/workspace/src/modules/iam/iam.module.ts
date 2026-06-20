import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmAccountEntity } from './infrastructure/entities/account.entity';
import { OrmRoleEntity } from './infrastructure/entities/role.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './infrastructure/security/jwt/jwt.strategy';
import { AbstractAccountRepository } from './domain/repositories/account.abstract-repository';
import { PostgresAccountRepository } from './infrastructure/repositories/postgres-account.repository';
import { AbstractHashPassword } from './application/ports/hash-password.abstract';
import { PasswordHashing } from './infrastructure/security/bcrypt.hash';
import { UseCaseProviders } from './account.providers';
import { AuthController } from './presentation/controllers/auth.controller';
import { AbstractTokenGenerator } from './application/ports/token-generate.abstract';
import { JwtTokenGenerator } from './infrastructure/security/jwt-token.generator';
import { AbstractPinoLogger } from './application/ports/logger.abstract';
import { PinoLoggerAdapter } from './infrastructure/logging/pino-logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrmAccountEntity, OrmRoleEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET'),
        signOptions: { expiresIn: ConfigService.get('JWT_EXPIRATION_TIME') },
      }),
    }),
  ],
  providers: [
    JwtStrategy,

    { provide: AbstractAccountRepository, useClass: PostgresAccountRepository },
    { provide: AbstractHashPassword, useClass: PasswordHashing },
    { provide: AbstractTokenGenerator, useClass: JwtTokenGenerator },
    { provide: AbstractPinoLogger, useClass: PinoLoggerAdapter },

    ...UseCaseProviders,
  ],
  controllers: [AuthController],
})
export class IamModule {}
