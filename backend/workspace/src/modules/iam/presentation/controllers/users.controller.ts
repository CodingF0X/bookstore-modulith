import { Controller, Get, Param } from '@nestjs/common';
import { GetUserByIdUseCase } from '../../application/use-cases/account';
import { GetUserbyIdResDTO } from '../DTO/res';
import { ApiTags } from '@nestjs/swagger';
import { SwaggergetUserByIdDocs } from '../decorators/users-swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  @Get('/id/:id')
  @SwaggergetUserByIdDocs()
  async getUserbyId(@Param('id') id: string): Promise<GetUserbyIdResDTO> {
    const account = await this.getUserByIdUseCase.excecute(id);

    return new GetUserbyIdResDTO(account);
  }
}
