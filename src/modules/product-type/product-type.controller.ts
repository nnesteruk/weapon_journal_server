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
import {
  CreateProductTypeDto,
  ResponseProductTypeDto,
  UpdateProductTypeDto,
} from "./dto";
import { ProductTypeService } from "./product-type.service";

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller("product-type")
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @ApiOperation({
    summary: "Получение всех типов",
    description: "Получает все типы продуктов",
  })
  @ApiOkResponse({
    description: "Успешное получение всех типов",
    type: [ResponseProductTypeDto],
  })
  @ApiCommonResponses()
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAllProductTypes() {
    return await this.productTypeService.getAllProductTypes();
  }

  // @Get(":id")
  // @ApiOperation({
  //   summary: "Получение типа по id",
  //   description: "Получает тип продукта по id",
  // })
  // @ApiOkResponse({
  //   description: "Успешное получение типа продукта",
  //   type: ResponseProductTypeDto,
  // })
  // @ApiCommonResponses("Тип продукта")
  // async getProductTypeById(@Param("id") id: string) {
  //   return this.productTypeService.getProductTypeById(id);
  // }

  @ApiOperation({
    summary: "Создание типа продукта",
    description: "Создает новый тип продукта",
  })
  @ApiOkResponse({
    description: "Успешное создание типа продукта",
    type: ResponseProductTypeDto,
  })
  @ApiConflictResponse({
    description: "Тип продукта уже существует",
    schema: {
      example: {
        statusCode: 409,
        message: "Тип продукта уже существует",
        error: "Conflict",
      },
    },
  })
  @ApiCommonResponses()
  @Post()
  async createProductType(@Body() dto: CreateProductTypeDto) {
    return await this.productTypeService.createProductType(dto);
  }

  @ApiOperation({
    summary: "Обновление типа продукта",
    description: "Обновляет тип продукта по id",
  })
  @ApiParam({
    name: "id",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор типа продукта",
  })
  @ApiOkResponse({
    description: "Успешное обновление типа продукта",
    type: ResponseProductTypeDto,
  })
  @ApiCommonResponses("Тип продукта")
  @Patch(":id")
  async updateProductType(
    @Param("id") id: string,
    @Body() dto: UpdateProductTypeDto,
  ) {
    return await this.productTypeService.updateProductType(id, dto);
  }

  @ApiOperation({
    summary: "Удаление типа продукта",
    description: "Удаляет тип продукта по id",
  })
  @ApiParam({
    name: "id",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор типа продукта",
  })
  @ApiOkResponse({
    description: "Успешное удаление типа продукта",
    type: ResponseProductTypeDto,
  })
  @ApiCommonResponses("Тип продукта")
  @Delete(":id")
  async deleteProductType(@Param("id") id: string) {
    return await this.productTypeService.deleteProductType(id);
  }
}
