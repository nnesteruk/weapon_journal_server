import { Roles } from "@common/decorators";
import { ApiCommonResponses } from "@common/decorators/api-common-responses.decorator";
import { Role } from "@common/enums";
import { AuthGuard, RolesGuard } from "@common/guards";
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
import { CaliberService } from "./caliber.service";
import { CreateCaliberDto, ResponseCaliberDto, UpdateCaliberDto } from "./dto";

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller("caliber")
export class CaliberController {
  constructor(private readonly caliberService: CaliberService) {}

  @ApiOperation({
    summary: "Получить все калибры",
    description: "Получает все калибры",
  })
  @ApiOkResponse({
    description: "Успешное получение всех калибров",
    type: [ResponseCaliberDto],
  })
  @ApiCommonResponses()
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAllCalibers() {
    return await this.caliberService.getAllCalibers();
  }

  @ApiOperation({
    summary: "Получить все калибры по типу продукта",
    description: "Получает все калибры по типу продукта",
  })
  @ApiOkResponse({
    description: "Успешное получение всех калибров по типу продукта",
    type: [ResponseCaliberDto],
  })
  @ApiCommonResponses()
  @Roles(Role.ADMIN, Role.USER)
  @Get(":productTypeId")
  async getAllCalibersByTypeId(@Param("productTypeId") productTypeId: string) {
    return await this.caliberService.getCaliberByTypeId(productTypeId);
  }

  @ApiOperation({
    summary: "Создание калибра",
    description: "Создает калибр",
  })
  @ApiOkResponse({
    description: "Успешное создание калибра",
    type: ResponseCaliberDto,
  })
  @ApiConflictResponse({
    description: "Калибр с таким названием уже существует",
    schema: {
      example: {
        statusCode: 409,
        message: "Калибр с таким названием уже существует",
        error: "Conflict",
      },
    },
  })
  @ApiCommonResponses()
  @Post()
  async createCaliber(@Body() dto: CreateCaliberDto) {
    return await this.caliberService.createCaliber(dto);
  }

  @ApiOperation({
    summary: "Обновление калибра",
    description: "Обновляет калибр",
  })
  @ApiParam({
    name: "id",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор калибра",
  })
  @ApiOkResponse({
    description: "Успешное обновление калибра",
    type: ResponseCaliberDto,
  })
  @ApiCommonResponses("Калибр")
  @Patch(":id")
  async updateCaliber(@Param("id") id: string, @Body() dto: UpdateCaliberDto) {
    return await this.caliberService.updateCaliber(id, dto);
  }

  @ApiOperation({
    summary: "Удаление калибра",
    description: "Удаляет калибр",
  })
  @ApiParam({
    name: "id",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор калибра",
  })
  @ApiOkResponse({
    description: "Успешное удаление калибра",
    type: ResponseCaliberDto,
  })
  @ApiCommonResponses("Калибр")
  @Delete(":id")
  async deleteCaliber(@Param("id") id: string) {
    return await this.caliberService.deleteCaliber(id);
  }
}
