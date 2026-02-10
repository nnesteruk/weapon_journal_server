import { ApiProperty } from "@nestjs/swagger";

export class ResponseApplicantDto {
  @ApiProperty({
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор заявителя",
  })
  id: string;

  @ApiProperty({
    description: "ФИО",
    example: "Иванов Иван Иванович",
    type: String,
    minLength: 3,
    maxLength: 100,
  })
  fullName: string;
}
