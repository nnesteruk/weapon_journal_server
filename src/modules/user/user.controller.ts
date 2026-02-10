import { ApiCommonResponses, Roles } from "@common/decorators";
import { Role } from "@common/enums";
import { AuthGuard, RolesGuard } from "@common/guards";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ResponseUserDto, UpdateUserDto } from "./dto";
import { UserService } from "./user.service";

@ApiTags("User")
@ApiBearerAuth()
@UseGuards(RolesGuard, AuthGuard)
@Roles(Role.ADMIN)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: "Получение всех пользователей",
    description: "Возвращает список всех пользователей",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Список пользователей",
    example: [],
  })
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({
    summary: "Получение пользователя по ID",
    description: "Возвращает пользователя по ID",
  })
  @ApiParam({ name: "id", type: "string", description: "ID фильма" })
  @ApiHeader({ name: "Authorization", description: "Токен авторизации" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Пользователь",
    example: { name: "" },
  })
  @ApiNotFoundResponse({
    description: "Пользователь не найден",
    example: {
      status: 404,
      message: "Пользователь не найден",
      timeStamp: "2025-10-30",
      path: "/users/123",
    },
  })
  @Roles(Role.ADMIN, Role.USER)
  @Get(":id")
  getUserById(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }

  // @ApiOperation({
  //   summary: "Создание пользователя",
  //   description: "Возвращает нового пользователя",
  // })
  // @ApiOkResponse({
  //   description: "Новый пользователь",
  //   type: ResponseUserDto,
  // })
  // @Post()
  // createUser(@Body() dto: CreateUserDto) {
  //   return this.userService.createUser(dto);
  // }

  @ApiOperation({
    summary: "Обновление пользователя",
    description: "Возвращает нового пользователя",
  })
  @ApiOkResponse({
    description: "Обновленный пользователь",
    type: ResponseUserDto,
  })
  @ApiParam({ name: "id", type: "string", description: "ID пользователя" })
  @ApiCommonResponses("Пользователь")
  @ApiConflictResponse({
    description: "Пользователь с таким логином уже существует",
    example: {
      status: 409,
      message: "Пользователь с таким логином уже существует",
      timeStamp: "2025-10-30",
      path: "/users/123",
    },
  })
  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @ApiOperation({
    summary: "Удаление пользователя",
    description: "Возвращает удаленного пользователя",
  })
  @ApiOkResponse({
    description: "Удаленный пользователь",
    type: ResponseUserDto,
  })
  @ApiParam({ name: "id", type: "string", description: "ID пользователя" })
  @ApiCommonResponses("Пользователь")
  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id);
  }
}
