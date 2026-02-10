import { PrismaService } from "@modules/prisma/prisma.service";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductCategoryDto, UpdateProductCategoryDto } from "./dto";

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllProductCategories() {
    return await this.prismaService.productCategory.findMany({
      select: {
        id: true,
        categoryName: true,
        productType: {
          select: {
            id: true,
            productType: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getAllProductCategoryByTypeId(productTypeId: string) {
    const productCategories = await this.prismaService.productCategory.findMany(
      {
        where: { productTypeId },
      },
    );

    if (!productCategories) {
      throw new NotFoundException("Категории типа оружия не найдены");
    }

    return productCategories;
  }

  async createProductCategory(dto: CreateProductCategoryDto) {
    const { categoryName, productTypeId } = dto;

    const productType = await this.prismaService.productType.findUnique({
      where: { id: productTypeId },
    });

    if (!productType) {
      throw new NotFoundException("Тип продукта не найден");
    }

    const existingProductCategory =
      await this.prismaService.productCategory.findUnique({
        where: {
          productTypeId_categoryName: {
            categoryName,
            productTypeId,
          },
        },
      });

    if (existingProductCategory) {
      throw new ConflictException(
        "Категория продукта уже существует для данного типа оружия",
      );
    }

    return this.prismaService.productCategory.create({
      data: { categoryName, productTypeId },
    });
  }

  async updateProductCategory(id: string, dto: UpdateProductCategoryDto) {
    const { categoryName, productTypeId } = dto;

    const productCategory = await this.prismaService.productCategory.findUnique(
      {
        where: { id },
      },
    );

    if (!productCategory) {
      throw new NotFoundException("Категория продукта не найдена");
    }

    const productType = await this.prismaService.productType.findUnique({
      where: { id: productTypeId },
    });

    if (!productType) {
      throw new NotFoundException("Тип продукта не найден");
    }

    return await this.prismaService.productCategory.update({
      where: { id },
      data: { categoryName, productTypeId },
    });
  }

  async deleteProductCategory(id: string) {
    const productCategory = await this.prismaService.productCategory.findUnique(
      {
        where: { id },
      },
    );

    if (!productCategory) {
      throw new NotFoundException("Категория продукта не найдено");
    }

    const deletedProductCategory =
      await this.prismaService.productCategory.delete({
        where: { id },
      });

    return deletedProductCategory.id;
  }
}
