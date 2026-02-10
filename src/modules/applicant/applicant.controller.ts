import { Roles } from "@common/decorators";
import { ApiCommonResponses } from "@common/decorators/api-common-responses.decorator";
import { AuthGuard } from "@common/guards/auth.guard";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { ApplicantService } from "./applicant.service";
import {
  CreateApplicantDto,
  ResponseApplicantDto,
  UpdateApplicantDto,
} from "./dto";
import { Role } from "@prisma/client";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller("applicant")
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService) {}

  @ApiOperation({
    summary: "Получение всех заявителей",
    description: "Получает список заявителей",
  })
  @ApiOkResponse({
    description: "Заявители успешно получены",
    type: [ResponseApplicantDto],
  })
  @ApiCommonResponses()
  @Get()
  async getAllApplicants() {
    return await this.applicantService.getAllApplicants();
  }

  // @ApiOperation({
  //   summary: "Получение заявителя по id",
  //   description: "Получает заявителя по id",
  // })
  // @ApiOkResponse({
  //   description: "Заявитель успешно получен",
  //   type: CreateApplicantDTO,
  // })
  // @ApiBadRequestResponse({
  //   description: "Некорректный запрос",
  //   example: {
  //     statusCode: 400,
  //     message: "Некорректный запрос",
  //     error: "Bad Request",
  //   },
  // })
  // @ApiUnauthorizedResponse({
  //   description: "Пользователь не авторизован",
  //   example: {
  //     statusCode: 401,
  //     message: "Для работы нужен токен!",
  //     error: "Unauthorized",
  //   },
  // })
  // @ApiNotFoundResponse({
  //   description: "Заявитель не найден",
  //   schema: {
  //     example: {
  //       statusCode: 404,
  //       message: "Заявитель не найден",
  //       error: "Not Found",
  //     },
  //   },
  // })
  // @Get(":id")
  // async getApplicantById(@Param("id") id: string) {
  //   return this.applicantService.getApplicantById(id);
  // }

  @ApiOperation({
    summary: "Добавления заявителя",
    description: "Добавляет заявителя",
  })
  @ApiOkResponse({
    description: "Заявитель успешно создан",
    type: CreateApplicantDto,
  })
  @ApiConflictResponse({
    description: "Заявитель с таким ФИО уже существует",
    schema: {
      example: {
        statusCode: 409,
        message: "Заявитель с таким ФИО уже существует",
        error: "Conflict",
      },
    },
  })
  @ApiCommonResponses()
  @Post()
  async createApplicant(@Body() dto: CreateApplicantDto) {
    return await this.applicantService.createApplicant(dto);
  }

  @ApiOperation({
    summary: "Редактирование заявителя",
    description: "Редактирует заявителя",
  })
  @ApiParam({
    name: "id",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор заявителя",
  })
  @ApiOkResponse({
    description: "Заявитель успешно изменён",
    type: ResponseApplicantDto,
  })
  @ApiCommonResponses("Заявитель")
  @Patch(":id")
  async updateApplicant(
    @Param("id") id: string,
    @Body() dto: UpdateApplicantDto,
  ) {
    return await this.applicantService.updateApplicant(id, dto);
  }

  @ApiOperation({
    summary: "Удаление заявителя",
    description: "Удаляет заявителя",
  })
  @ApiParam({
    name: "id",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор заявителя",
  })
  @ApiOkResponse({
    description: "Заявитель успешно удален",
    type: ResponseApplicantDto,
  })
  @ApiCommonResponses("Заявитель")
  @Delete(":id")
  async deleteApplicant(@Param("id") id: string) {
    return await this.applicantService.deleteApplicant(id);
  }
}
