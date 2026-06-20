import { ApiProperty } from '@nestjs/swagger';

export class LoginResDTO {
  @ApiProperty({
    description: 'The JWT Access Token used for subsequent requests.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;
}
