import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountUseCase } from '../../application/use-cases/account/create-account.use-case';
import { CreateAccountReqDTO } from '../DTO/req/create-account.req-dto';
import { CreateAccountResDTO } from '../DTO/res/create-account.res-dto';

@Controller('auth')
export class AccountController {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  @Post('register')
  async register(
    @Body() body: CreateAccountReqDTO,
  ): Promise<CreateAccountResDTO> {
    const account = await this.createAccountUseCase.execute(body);

    return new CreateAccountResDTO(account);
  }
}
