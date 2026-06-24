import { ApiProperty } from '@nestjs/swagger';
import { singleAccountResDTO } from './query-single-account.res-dto';

export class PaginatedAccountsResponseDto {
  @ApiProperty({
    description: 'The array of accounts for the current page.',
    type: [singleAccountResDTO],
  })
  data!: singleAccountResDTO[];

  @ApiProperty({
    description: 'The total number of accounts in the entire database.',
    example: 145,
  })
  total!: number;

  @ApiProperty({
    description: 'The current page number.',
    example: 1,
  })
  page!: number;

  @ApiProperty({
    description: 'The maximum number of items returned per page.',
    example: 10,
  })
  limit!: number;
}
