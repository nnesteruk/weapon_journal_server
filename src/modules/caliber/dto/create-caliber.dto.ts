import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateCaliberDto {
  @ApiProperty({
    description: "Калибр (наименование)",
    example: "4,5",
    type: String,
    maxLength: 100,
  })
  @IsString({ message: "Наименование должно быть строкой" })
  @IsNotEmpty({ message: "Наименование не может быть пустым" })
  @MaxLength(100, { message: "Максимум 100 символов" })
  name: string;

  @ApiProperty({
    description: "Уникальный идентификатор типа продукта",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    type: String,
  })
  @IsUUID("4", { message: "ID продукта должен быть UUID v4" })
  @IsNotEmpty({ message: "ID типа продукта не может быть пустым" })
  productTypeId: string;
}
