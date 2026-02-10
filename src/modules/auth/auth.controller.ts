import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./dto/auth.dto";
import { LoginRequest } from "./dto/login.dto";
import { RegisterRequest } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: "Создание аккаунта",
    description: "Создаёт новый аккаунт пользователя",
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: "Некорректные данные",
    example: {
      statusCode: 400,
      message: "Некорректные данные",
      error: "Bad Request",
    },
  })
  @ApiConflictResponse({
    description: "Пользователь с таким логином уже существует",
    schema: {
      example: {
        statusCode: 409,
        message: "Пользователь с таким логином уже существует",
        error: "Conflict",
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("register")
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: "Вход в систему",
    description: "Авторизует пользователя и выдаёт токен доступа",
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: "Некорректные входные данные",
    schema: {
      example: {
        statusCode: 400,
        message: "Некорректные входные данные",
        error: "Bad Request",
      },
    },
  })
  @ApiNotFoundResponse({
    description: "Пользователь не найден",
    schema: {
      example: {
        statusCode: 404,
        message: "Пользователь не найден",
        error: "Not Found",
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: "Обновление токена доступа",
    description: "Генерирует новый токен доступа",
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({
    description: "Недействительный refresh-токен",
    schema: {
      example: {
        statusCode: 401,
        message: "Недействительный refresh-токен",
        error: "Unauthorized",
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refreshToken(req, res);
  }

  @ApiOperation({
    summary: "Выход из системы",
    description: "Удаляет refresh-токен",
  })
  @ApiOkResponse({
    schema: {
      example: "Вы успешно вышли из системы",
    },
  })
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }
}
