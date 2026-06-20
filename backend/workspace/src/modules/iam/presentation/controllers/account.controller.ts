import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountUseCase } from '../../application/use-cases/account/create-account.use-case';
import { CreateAccountReqDTO } from '../DTO/req/create-account.req-dto';
import { CreateAccountResDTO } from '../DTO/res/create-account.res-dto';
import { LoginUseCase } from '../../application/use-cases/account/login.use-case';
import { LoginReqDTO } from '../DTO/req/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  async register(
    @Body() body: CreateAccountReqDTO,
  ): Promise<CreateAccountResDTO> {
    const account = await this.createAccountUseCase.execute(body);

    return new CreateAccountResDTO(account);
  }

  @Post('login')
  async login(@Body() body: LoginReqDTO): Promise<{ accessToken: string }> {
    return await this.loginUseCase.execute(body);
  }
}
