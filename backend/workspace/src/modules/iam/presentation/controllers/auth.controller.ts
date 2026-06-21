import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateAccountUseCase } from '../../application/use-cases/account/create-account.use-case';
import { CreateAccountReqDTO } from '../DTO/req/create-account.req-dto';
import { CreateAccountResDTO } from '../DTO/res/create-account.res-dto';
import { LoginUseCase } from '../../application/use-cases/account/login.use-case';
import { LoginReqDTO } from '../DTO/req/login-request.dto';
import { LoginResDTO } from '../DTO/res/login-response.dto';
import { SwaggerLoginDocs } from '../decorators/login-swagger.decorator';
import { SwaggerRegisterDocs } from '../decorators/register-swagger.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LogoutUseCase } from '../../application/use-cases/account/logout.use-case';
import { GetUser } from '../../infrastructure/security/jwt/create-user.decorator';
import { Account } from '../../domain/aggregates/account.aggregate-root';
import { AuthGuard } from '@nestjs/passport';
import { SwaggerLogoutDocs } from '../decorators/logout-swagger.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Post('register')
  @SwaggerRegisterDocs()
  async register(
    @Body() body: CreateAccountReqDTO,
  ): Promise<CreateAccountResDTO> {
    const account = await this.createAccountUseCase.execute(body);

    return new CreateAccountResDTO(account);
  }

  @Post('login')
  @SwaggerLoginDocs()
  async login(@Body() body: LoginReqDTO): Promise<LoginResDTO> {
    const result = await this.loginUseCase.execute(body);
    const response = new LoginResDTO();

    response.accessToken = result.accessToken;
    return response;
  }

  @Post('logout')
  @SwaggerLogoutDocs()
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async logout(@GetUser() user: Account): Promise<void> {
    return await this.logoutUseCase.execute(user.id.getValue);
  }
}
