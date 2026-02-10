import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateApplicantDto {
  @ApiProperty({
    description: "ФИО или наименование организации",
    example: "Иванов Иван Иванович",
    type: String,
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: "Заявитель должно быть строкой" })
  @IsNotEmpty({ message: "Заявитель не может быть пустым" })
  @Length(3, 100, { message: "Минимум 3 символа и максимум 100 символов" })
  fullName: string;
}
