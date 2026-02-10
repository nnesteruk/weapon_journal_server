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
import { CreateProductDto, ResponseProductDto, UpdateProductDto } from "./dto";
import { ProductService } from "./product.service";

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOkResponse({
    description: "Список продуктов",
    type: [ResponseProductDto],
  })
  @ApiOperation({
    summary: "Получение списка продуктов",
    description: "Получает список продуктов",
  })
  @ApiCommonResponses()
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @ApiOkResponse({
    description: "Список продуктов по id дела",
    type: [ResponseProductDto],
  })
  @ApiOperation({
    summary: "Получение списка продуктов по id дела",
    description: "Получает список продуктов по id дела",
  })
  @ApiCommonResponses()
  @Roles(Role.ADMIN, Role.USER)
  @Get(":id")
  async getProductById(@Param("id") id: string) {
    return await this.productService.getProductById(id);
  }

  @ApiOkResponse({
    description: "Продукт создан",
    type: ResponseProductDto,
  })
  @ApiOperation({
    summary: "Создание продукта",
    description: "Создает продукт",
  })
  @ApiConflictResponse({
    description: "Продукт с таким названием уже существует",
    schema: {
      example: {
        statusCode: 409,
        message: "Продукт с таким названием уже существует",
        error: "Conflict",
      },
    },
  })
  @ApiCommonResponses()
  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    return await this.productService.createProduct(dto);
  }

  @ApiOkResponse({
    description: "Продукт обновлен",
    type: ResponseProductDto,
  })
  @ApiParam({
    name: "id",
    description: "ID продукта",
    example: "7c1b5a48-6fa1-4c63-8d16-c5e984f7e3a7",
  })
  @ApiOperation({
    summary: "Обновление продукта",
    description: "Обновляет продукт",
  })
  @ApiCommonResponses("Продукт")
  @Patch(":id")
  async updateProduct(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return await this.productService.updateProduct(id, dto);
  }

  @ApiOkResponse({
    description: "Продукт удален",
    type: ResponseProductDto,
  })
  @ApiParam({
    name: "id",
    description: "ID продукта",
    example: "7c1b5a48-6fa1-4c63-8d16-c5e984f7e3a7",
  })
  @ApiOperation({
    summary: "Удаление продукта",
    description: "Удаляет продукт",
  })
  @ApiCommonResponses("Продукт")
  @Delete(":id")
  async deleteProduct(@Param("id") id: string) {
    return await this.productService.deleteProduct(id);
  }
}
