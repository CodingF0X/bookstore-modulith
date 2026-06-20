import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAccountReqDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The registered email address of the account.',
    example: 'user@example.com',
  })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The plain-text password.',
    example: 'SuperSecretPassword123!',
    minLength: 8,
  })
  password!: string;
}
