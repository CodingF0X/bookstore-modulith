import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetUserByIdUseCase } from '../../application/use-cases/account';
import { GetUserbyIdResDTO } from '../DTO/res';
import { ApiTags } from '@nestjs/swagger';
import { SwaggergetUserByIdDocs } from '../decorators/users-swagger';
import { PaginationReqDTO } from '../DTO/req/pagination.req-dto';
import { AbstractAccountsQuery } from '../../application/queries/get-accounts';
import { PaginatedAccountsResponseDto } from '../DTO/res/paginated-accounts.res-dto';
import { SwaggerGetAllUsersDocs } from '../decorators/users-swagger/get-all-users-swagger.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getAccountsQuery: AbstractAccountsQuery,
  ) {}

  @Get('/id/:id')
  @SwaggergetUserByIdDocs()
  async getUserbyId(@Param('id') id: string): Promise<GetUserbyIdResDTO> {
    const account = await this.getUserByIdUseCase.excecute(id);

    return new GetUserbyIdResDTO(account);
  }

  @Get()
  @SwaggerGetAllUsersDocs()
  async getAllUsers(
    @Query() query: PaginationReqDTO,
  ): Promise<PaginatedAccountsResponseDto> {
    const res = await this.getAccountsQuery.getAllAccounts(
      query.page,
      query.limit,
    );
    return res;
  }
}
