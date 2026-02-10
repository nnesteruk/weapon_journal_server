import { ApiCommonResponses } from "@common/decorators/api-common-responses.decorator";
import { AuthGuard } from "@common/guards";
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
import {
  CreateManufacturerDto,
  ResponseManufacturerDto,
  UpdateManufacturerDto,
} from "./dto";
import { ManufacturerService } from "./manufacturer.service";
import { Roles } from "@common/decorators";
import { Role } from "@prisma/client";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("manufacturer")
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @ApiOperation({
    summary: "Получение всех производителей",
    description: "Получает всех производителей",
  })
  @ApiOkResponse({
    description: "Производители успешно получены",
    type: [ResponseManufacturerDto],
  })
  @ApiCommonResponses()
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAllManufacturers() {
    return await this.manufacturerService.getAllManufacturers();
  }

  @ApiOperation({
    summary: "Создание производителя",
    description: "Создает производителя",
  })
  @ApiOkResponse({
    description: "Производитель успешно создан",
    type: ResponseManufacturerDto,
  })
  @ApiConflictResponse({
    description: "Производитель с таким названием уже существует",
    schema: {
      example: {
        statusCode: 409,
        message: "Производитель с таким названием уже существует",
        error: "Conflict",
      },
    },
  })
  @ApiCommonResponses()
  @Post()
  async createManufacturer(@Body() dto: CreateManufacturerDto) {
    return await this.manufacturerService.createManufacturer(dto);
  }

  @ApiOperation({
    summary: "Обновление производителя",
    description: "Обновляет производителя",
  })
  @ApiParam({
    name: "id",
    description: "Уникальный идентификатор производителя",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
  })
  @ApiOkResponse({
    description: "Производитель успешно обновлен",
    type: ResponseManufacturerDto,
  })
  @ApiCommonResponses("Производитель")
  @Patch(":id")
  async updateManufacturer(
    @Param("id") id: string,
    @Body() dto: UpdateManufacturerDto,
  ) {
    return await this.manufacturerService.updateManufacturer(id, dto);
  }

  @ApiOperation({
    summary: "Удаление производителя",
    description: "Удаляет производителя",
  })
  @ApiOkResponse({
    description: "Производитель успешно удален",
    type: ResponseManufacturerDto,
  })
  @ApiParam({
    name: "id",
    description: "Уникальный идентификатор производителя",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
  })
  @ApiCommonResponses("Производитель")
  @Delete(":id")
  async deleteManufacturer(@Param("id") id: string) {
    return await this.manufacturerService.deleteManufacturer(id);
  }
}
