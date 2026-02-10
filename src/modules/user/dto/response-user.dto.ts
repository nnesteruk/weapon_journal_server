import { ApiProperty } from "@nestjs/swagger";

export class ResponseUserDto {
  @ApiProperty({
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор калибра",
  })
  id: string;

  @ApiProperty({
    example: "kalinka_10",
    description: "Логин пользователя",
  })
  login: string;

  @ApiProperty({
    example: "Иванов Иван Иванович",
    description: "Полное имя пользователя",
  })
  name: string;
}
