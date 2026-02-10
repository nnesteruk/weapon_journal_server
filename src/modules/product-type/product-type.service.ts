import { PrismaService } from "@modules/prisma/prisma.service";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductTypeDto, UpdateProductTypeDto } from "./dto";

@Injectable()
export class ProductTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllProductTypes() {
    return this.prismaService.productType.findMany({
      omit: { createdAt: true, updatedAt: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getProductTypeById(id: string) {
    const productType = await this.prismaService.productType.findUnique({
      where: { id },
    });

    if (!productType) {
      throw new NotFoundException("Тип продукта не найден");
    }

    return productType;
  }

  async createProductType(dto: CreateProductTypeDto) {
    const { productType } = dto;

    const existedProductType = await this.prismaService.productType.findUnique({
      where: { productType },
    });

    if (existedProductType) {
      throw new ConflictException("Тип продукта с таким именем уже существует");
    }

    return this.prismaService.productType.create({ data: { productType } });
  }

  async updateProductType(id: string, dto: UpdateProductTypeDto) {
    const { productType } = dto;

    const productTypeToUpdate = await this.getProductTypeById(id);

    if (!productTypeToUpdate) {
      throw new NotFoundException("Тип продукта не найден");
    }

    return this.prismaService.productType.update({
      where: { id: productTypeToUpdate.id },
      data: { productType },
    });
  }

  async deleteProductType(id: string) {
    const productType = await this.getProductTypeById(id);

    if (!productType) {
      throw new NotFoundException("Тип продукта не найден");
    }

    const deletedProductType = await this.prismaService.productType.delete({
      where: { id: productType.id },
    });

    return deletedProductType.id;
  }
}
