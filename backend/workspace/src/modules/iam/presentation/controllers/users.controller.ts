import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  GetUserByEmailUseCase,
  GetUserByIdUseCase,
} from '../../application/use-cases/account';
import { GetUserByIdentifierResDTO } from '../DTO/res';
import { ApiTags } from '@nestjs/swagger';
import {
  SwaggerGetAllUsersDocs,
  SwaggerGetUserByEmailDocs,
  SwaggergetUserByIdDocs,
} from '../decorators/users-swagger';
import { PaginationReqDTO } from '../DTO/req/pagination.req-dto';
import { AbstractAccountsQuery } from '../../application/queries/get-accounts';
import { PaginatedAccountsResponseDto } from '../DTO/res/paginated-accounts.res-dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUSerByEmailUseCase: GetUserByEmailUseCase,
    private readonly getAccountsQuery: AbstractAccountsQuery,
  ) {}

  @Get('/id/:id')
  @SwaggergetUserByIdDocs()
  async getUserbyId(
    @Param('id') id: string,
  ): Promise<GetUserByIdentifierResDTO> {
    const account = await this.getUserByIdUseCase.excecute(id);

    return new GetUserByIdentifierResDTO(account);
  }

  @Get('/email/:email')
  @SwaggerGetUserByEmailDocs()
  async GetUserByEmail(
    @Param('email') email: string,
  ): Promise<GetUserByIdentifierResDTO> {
    const account = await this.getUSerByEmailUseCase.execute(email);

    return new GetUserByIdentifierResDTO(account);
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
