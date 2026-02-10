import { ApiProperty } from "@nestjs/swagger";

export class ResponseModelDto {
  @ApiProperty({
    description: "Уникальный идентификатор модели",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    type: String,
  })
  id: string;

  @ApiProperty({
    description: "Модель (наименование)",
    example: "Сайга-12",
    type: String,
    minLength: 2,
    maxLength: 100,
  })
  modelName: string;

  @ApiProperty({
    description: "ID типа продукта",
    example: "d56a4180-65aa-42ec-a945-5fd21dec0538",
  })
  productTypeId: string;

  @ApiProperty({
    description: "ID категории продукта",
    example: "4a69b43b-9a3a-41ac-91f5-6e5cc066a234",
  })
  productCategoryId: string;
}
