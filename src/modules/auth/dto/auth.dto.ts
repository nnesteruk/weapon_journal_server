import { ApiProperty } from "@nestjs/swagger";

export class AuthResponse {
  @ApiProperty({
    description: "JWT ACCESS TOKEN",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  accessToken: string;
}
