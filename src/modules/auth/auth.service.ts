import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import { isDev } from "@utils/is-dev.util";
import { hash, verify } from "argon2";
import type { Request, Response } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { LoginRequest } from "./dto/login.dto";
import { RegisterRequest } from "./dto/register.dto";
import { JwtPayload } from "./interfaces/jwt.interface";

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string = "JWT_ACCESS_TOKEN_TTL";
  private readonly JWT_REFRESH_TOKEN_TTL: string = "JWT_REFRESH_TOKEN_TTL";
  private readonly COOKIE_DOMAIN: string = "COOKIE_DOMAIN";

  constructor(
    private readonly prismaService: PrismaService,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(res: Response, dto: RegisterRequest) {
    const { login, password, name, role } = dto;

    const existUser = await this.prismaService.user.findUnique({
      where: { login },
    });

    if (existUser) {
      throw new ConflictException(
        "Пользователь с таким логином уже существует",
      );
    }

    const user = await this.prismaService.user.create({
      data: { login, password: await hash(password), name, role },
    });

    return this.auth(res, user.id, user.role);
  }

  async login(res: Response, dto: LoginRequest) {
    const { login, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { login },
    });

    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new NotFoundException("Неверный пароль");
    }

    return this.auth(res, user.id, user.role);
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken: string = req.cookies["refreshToken"];

    if (!refreshToken) {
      throw new UnauthorizedException("Недействительный refresh-токен");
    }

    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        throw new NotFoundException("Пользователь не найден");
      }

      return this.auth(res, user.id, user.role);
    }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async logout(res: Response) {
    this.setCookie(res, "refreshToken", new Date(0));

    return { message: "Вы успешно вышли из системы" };
  }

  private auth(res: Response, id: string, role: Role) {
    const { accessToken, refreshToken } = this.generateTokens(id, role);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    );

    return { accessToken };
  }

  async validate(id: string, role: Role) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    if (role && user.role !== role) {
      throw new UnauthorizedException(
        "Недостаточно прав для выполнения действия",
      );
    }

    return user;
  }

  private generateTokens(id: string, role: Role) {
    const payload: JwtPayload = { id, role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow(this.JWT_ACCESS_TOKEN_TTL),
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow(this.JWT_REFRESH_TOKEN_TTL),
    });

    return { accessToken, refreshToken };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    const isDevelopment = isDev(this.configService);

    res.cookie("refreshToken", value, {
      expires,
      httpOnly: true,
      domain: this.configService.getOrThrow(this.COOKIE_DOMAIN),
      // secure: !isDevelopment,
      secure: false,
      // sameSite: isDevelopment ? "lax" : "none",
      sameSite: "lax",
      path: "/",
    });
  }
}
