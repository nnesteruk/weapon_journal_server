import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Логин пользователя",
    example: "admin",
    type: String,
    minLength: 2,
    maxLength: 30,
  })
  @IsString({ message: "Логин должен быть строкой" })
  @IsNotEmpty({ message: "Логин не может быть пустым" })
  @Length(2, 30, { message: "Минимум 2 символа и максимум 30 символов" })
  login: string;

  @ApiProperty({
    description: "Пароль пользователя",
    example: "123456fD@",
    type: String,
    minLength: 6,
    maxLength: 30,
  })
  @IsString({ message: "Пароль должен быть строкой" })
  @IsNotEmpty({ message: "Пароль не может быть пустым" })
  @Length(6, 30, { message: "Минимум 8 символов и максимум 12 символов" })
  @Matches(
    /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
    {
      message:
        "Пароль должен содержать хотя бы одну цифру, одну заглавную и маленькую букву, один специальный символ",
    },
  )
  password: string;

  @ApiProperty({
    description: "ФИО пользователя",
    example: "Иванов Иван Иванович",
    type: String,
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: "ФИО должно быть строкой" })
  @IsNotEmpty({ message: "ФИО не может быть пустым" })
  @Length(3, 100, { message: "Минимум 3 символа и максимум 100 символов" })
  @Matches(/^[А-ЯЁ][а-яё-]+ [А-ЯЁ][а-яё-]+ [А-ЯЁ][а-яё-]+$/, {
    message:
      "ФИО должно состоять из трёх слов (Фамилия Имя Отчество), каждое с заглавной буквы и через пробел",
  })
  name: string;

  @ApiProperty({
    description: "Роль пользователя",
    example: "USER",
    type: String,

    enum: Role,
  })
  @IsEnum(Role, { message: "Роль должна быть USER или ADMIN" })
  role: Role;
}
