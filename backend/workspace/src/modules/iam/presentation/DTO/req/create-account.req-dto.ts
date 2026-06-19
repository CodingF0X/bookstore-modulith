import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAccountReqDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
