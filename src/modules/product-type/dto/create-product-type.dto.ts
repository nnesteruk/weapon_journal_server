import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateProductTypeDto {
  @ApiProperty({
    description: "Тип продукта (наименование)",
    example: "Огнестрельное",
    type: String,
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: "Наименование должно быть строкой" })
  @IsNotEmpty({ message: "Наименование не может быть пустым" })
  @Length(3, 100, { message: "Минимум 3 символа и максимум 100 символов" })
  productType: string;
}
