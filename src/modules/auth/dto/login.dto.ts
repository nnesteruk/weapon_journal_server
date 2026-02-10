import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class LoginRequest {
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
        "Должен содержать хотя бы одну цифру, одну заглавную букву и один специальный символ",
    },
  )
  password: string;
}
