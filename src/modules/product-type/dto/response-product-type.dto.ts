import { ApiProperty } from "@nestjs/swagger";

export class ResponseProductTypeDto {
  @ApiProperty({
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор типа продукта",
  })
  id: string;

  @ApiProperty({
    example: "Огнестрельное",
    description: "Тип продукта",
  })
  productType: string;
}
