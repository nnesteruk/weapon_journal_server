import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";

export class CreateModelDto {
  @ApiProperty({
    description: "Модель (наименование)",
    example: "Сайга-12",
    type: String,
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: "Наименование модели должно быть строкой" })
  @IsNotEmpty({ message: "Наименование модели не может быть пустым" })
  @Length(2, 100, { message: "Минимум 2 символа и максимум 100 символов" })
  modelName: string;

  @ApiProperty({
    description: "ID типа продукта",
    example: "d56a4180-65aa-42ec-a945-5fd21dec0538",
  })
  @IsUUID("4", { message: "ID продукта должен быть UUID v4" })
  @IsNotEmpty({ message: "Тип продукта обязателен" })
  productTypeId: string;

  @ApiProperty({
    description: "ID категории продукта",
    example: "4a69b43b-9a3a-41ac-91f5-6e5cc066a234",
  })
  @IsUUID("4", { message: "ID продукта должен быть UUID v4" })
  @IsNotEmpty({ message: "Категория продукта обязательна" })
  productCategoryId: string;
}
