import { PrismaService } from "@modules/prisma/prisma.service";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { hash } from "argon2";
import { UpdateUserDto } from "./dto";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    return this.prismaService.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }

    return user;
  }

  // async createUser(dto: CreateUserDto) {
  //   const { login, password, name, role } = dto;

  //   const existUser = await this.prismaService.user.findUnique({
  //     where: { login },
  //   });

  //   if (existUser) {
  //     throw new ConflictException(
  //       "Пользователь с таким логином уже существует",
  //     );
  //   }

  //   return this.prismaService.user.create({
  //     data: { login, password, name, role: role ?? "USER" },
  //   });
  // }

  async updateUser(id: string, dto: UpdateUserDto) {
    const { login, password, name, role } = dto;

    const user = await this.getUserById(id);

    if (login && login !== user.login) {
      const existUser = await this.prismaService.user.findUnique({
        where: { login },
      });

      if (existUser) {
        throw new ConflictException(
          "Пользователь с таким логином уже существует",
        );
      }
    }

    return this.prismaService.user.update({
      where: { id: user.id },
      data: {
        login,
        password: password && (await hash(password)),
        name,
        role: role ?? "USER",
      },
    });
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);

    const deletedUser = await this.prismaService.user.delete({
      where: { id: user.id },
    });
    return deletedUser.id;
  }
}
