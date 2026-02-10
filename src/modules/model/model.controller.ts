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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { UpdateModelDto } from "./dto";
import { CreateModelDto } from "./dto/create-model.dto";
import { ResponseModelDto } from "./dto/response-model.dto";
import { ModelService } from "./model.service";

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller("model")
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @ApiOperation({
    summary: "Получение всех моделей",
    description: "Получить все модели",
  })
  @ApiOkResponse({
    description: "Успешное получение моделей",
    type: [ResponseModelDto],
  })
  @ApiCommonResponses()
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAllModels() {
    return await this.modelService.getAllModels();
  }

  @ApiOperation({
    summary: "Получение всех моделей по категории",
    description: "Получить все модели по категории",
  })
  @ApiOkResponse({
    description: "Успешное получение моделей по категории",
    type: [ResponseModelDto],
  })
  @ApiCommonResponses()
  @Roles(Role.ADMIN, Role.USER)
  @Get(":categoryId")
  async getAllModelsByCategory(@Param("categoryId") categoryId: string) {
    return await this.modelService.getAllModelsByCategory(categoryId);
  }

  @ApiOperation({
    summary: "Создание модели",
    description: "Создает новое модель",
  })
  @ApiCreatedResponse({
    description: "Успешное создание модели",
    type: ResponseModelDto,
  })
  @ApiConflictResponse({
    description: "Модель уже существует",
    schema: {
      example: {
        statusCode: 409,
        message: "Модель уже существует",
        error: "Conflict",
      },
    },
  })
  @ApiCommonResponses()
  @Post()
  async createModel(@Body() dto: CreateModelDto) {
    return await this.modelService.createModel(dto);
  }

  @ApiOkResponse({
    description: "Успешное обновление модели",
    type: ResponseModelDto,
  })
  @ApiParam({
    name: "id",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор модели",
  })
  @ApiOperation({
    summary: "Обновление модели по id",
    description: "Обновляет модель по id",
  })
  @ApiCommonResponses("Модель")
  @Patch(":id")
  async updateModel(@Param("id") id: string, @Body() dto: UpdateModelDto) {
    return await this.modelService.updateModel(id, dto);
  }

  @ApiParam({
    name: "id",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор модели",
  })
  @ApiOkResponse({
    description: "Успешное удаление модели",
    type: ResponseModelDto,
  })
  @ApiOperation({
    summary: "Удаление модели по id",
    description: "Удаляет модель по id",
  })
  @ApiCommonResponses("Модель")
  @Delete(":id")
  async deleteModel(@Param("id") id: string) {
    return await this.modelService.deleteModel(id);
  }
}
