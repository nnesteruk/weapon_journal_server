import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class CreateProductCategoryDto {
  @ApiProperty({
    description: "Категория продукта (наименование)",
    example: "Пистолеты",
    type: String,
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: "Наименование должно быть строкой" })
  @IsNotEmpty({ message: "Наименование не может быть пустым" })
  @Length(3, 100, { message: "Минимум 3 символа и максимум 100 символов" })
  categoryName: string;

  @ApiProperty({
    description: "Уникальный идентификатор типа продукта",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    type: String,
  })
  @IsUUID("4", { message: "ID продукта должен быть UUID v4" })
  @IsNotEmpty({ message: "ID типа  продукта не может быть пустым" })
  productTypeId: string;
}
