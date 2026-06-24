import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class singleAccountResDTO {
  @ApiProperty({
    description: 'The unique UUID of the account.',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  id!: string;

  @ApiProperty({
    description: 'The registered email address.',
    example: 'admin@bookstore.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Whether the account is currently active or banned.',
    example: true,
  })
  isActive!: boolean;

  @ApiPropertyOptional({
    description:
      'The timestamp of the last successful login. Null if never logged in.',
    example: '2023-10-15T14:30:00.000Z',
    type: String,
    nullable: true,
  })
  lastLoginAt!: Date | null;

  @ApiProperty({
    description: 'The list of roles assigned to the account.',
    example: ['CUSTOMER', 'ADMIN'],
    isArray: true,
    type: String,
  })
  roles!: string[];
}
