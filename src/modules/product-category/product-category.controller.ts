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
  CreateProductCategoryDto,
  ResponseProductCategoryDto,
  UpdateProductCategoryDto,
} from "./dto";
import { ProductCategoryService } from "./product-category.service";

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller("product-category")
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @ApiOperation({
    summary: "Получить все категории продуктов",
    description: "Получает все категории продуктов",
  })
  @ApiOkResponse({
    description: "Успешное получение всех категорий продуктов",
    type: [ResponseProductCategoryDto],
  })
  @ApiCommonResponses()
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAllProductCategories() {
    return await this.productCategoryService.getAllProductCategories();
  }

  @ApiOperation({
    summary: "Получить все категории продуктов по типу",
    description: "Получает все категории продуктов по типу",
  })
  @ApiOkResponse({
    description: "Успешное получение всех категорий продуктов по типу",
    type: [ResponseProductCategoryDto],
  })
  @ApiCommonResponses()
  @Roles(Role.ADMIN, Role.USER)
  @Get(":productTypeId")
  async getAllProductCategoriesByTypeId(
    @Param("productTypeId") productTypeId: string,
  ) {
    return await this.productCategoryService.getAllProductCategoryByTypeId(
      productTypeId,
    );
  }

  @ApiOperation({
    summary: "Создание категории продукта",
    description: "Создает новую категорию продукта",
  })
  @ApiOkResponse({
    description: "Успешное создание категории продукта",
    type: ResponseProductCategoryDto,
  })
  @ApiConflictResponse({
    description: "Категория продукта уже существует",
    schema: {
      example: {
        statusCode: 409,
        message: "Категория продукта уже существует",
        error: "Conflict",
      },
    },
  })
  @ApiCommonResponses()
  @Post()
  async createProductCategory(@Body() dto: CreateProductCategoryDto) {
    return await this.productCategoryService.createProductCategory(dto);
  }

  @ApiOperation({
    summary: "Обновление категории продукта",
    description: "Обновляет категории продукта по id",
  })
  @ApiParam({
    name: "id",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор категории продукта",
  })
  @ApiOkResponse({
    description: "Успешное обновление категории продукта",
    type: ResponseProductCategoryDto,
  })
  @ApiCommonResponses("Категория продукта")
  @Patch(":id")
  async updateProductCategory(
    @Param("id") id: string,
    @Body() dto: UpdateProductCategoryDto,
  ) {
    return await this.productCategoryService.updateProductCategory(id, dto);
  }

  @ApiOperation({
    summary: "Удаление категории продукта",
    description: "Удаляет категории продукта по id",
  })
  @ApiParam({
    name: "id",
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор категории продукта",
  })
  @ApiOkResponse({
    description: "Успешное удаление категории продукта",
    type: ResponseProductCategoryDto,
  })
  @ApiCommonResponses("Тип продукта")
  @Delete(":id")
  async deleteProductCategory(@Param("id") id: string) {
    return await this.productCategoryService.deleteProductCategory(id);
  }
}
