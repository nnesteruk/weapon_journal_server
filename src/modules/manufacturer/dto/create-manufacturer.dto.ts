import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateManufacturerDto {
  @ApiProperty({
    description: "Производитель (наименование)",
    example: "Ижевский машиностроительный завод",
    type: String,
    minLength: 2,
    maxLength: 100,
  })
  @IsString({ message: "Наименование должно быть строкой" })
  @IsNotEmpty({ message: "Наименование не может быть пустым" })
  @Length(2, 100, { message: "Минимум 2 символа и максимум 100 символов" })
  name: string;

  @ApiProperty({
    description: "Страна",
    example: "Россия",
    type: String,
  })
  @IsString({ message: "Страна должна быть строкой" })
  @IsNotEmpty({ message: "Страна не может быть пустой" })
  @Length(2, 100, { message: "Минимум 2 символа и максимум 100 символов" })
  country: string;
}
