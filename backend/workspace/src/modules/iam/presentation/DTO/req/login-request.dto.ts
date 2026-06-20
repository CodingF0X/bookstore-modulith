import { IsNotEmpty, IsString } from 'class-validator';

export class LoginReqDTO {
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
