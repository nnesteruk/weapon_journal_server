import { ApiProperty } from "@nestjs/swagger";

export class ResponseManufacturerDto {
  @ApiProperty({
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор производителя",
  })
  id: string;

  @ApiProperty({
    example: "Ижевский машиностроительный завод",
    description: "Производитель (наименование)",
  })
  name: string;

  @ApiProperty({
    description: "Страна",
    example: "Россия",
    type: String,
  })
  country: string;
}
