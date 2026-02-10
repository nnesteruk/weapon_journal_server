import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto, UpdateProductDto } from "./dto";

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllProducts() {
    return await this.prismaService.product.findMany({
      omit: {
        createdAt: true,
        updatedAt: true,
        manufacturerId: true,
        productCategoryId: true,
        modelId: true,
        productTypeId: true,
        caliberId: true,
      },
      include: {
        productType: { omit: { createdAt: true, updatedAt: true } },
        manufacturer: { omit: { createdAt: true, updatedAt: true } },
        model: { omit: { createdAt: true, updatedAt: true } },
        productCategory: { omit: { createdAt: true, updatedAt: true } },
        caliber: { omit: { createdAt: true, updatedAt: true } },
        case: { omit: { createdAt: true, updatedAt: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getProductById(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        productType: true,
        manufacturer: true,
        model: true,
        productCategory: true,
        caliber: true,
        case: true,
      },
    });

    if (!product) throw new NotFoundException("Продукт не найден");

    return product;
  }

  async getProductByCaseNum(caseId: string) {
    const products = await this.prismaService.product.findMany({
      where: {
        caseId,
      },
      include: {
        caliber: true,
        manufacturer: true,
        model: true,
        productCategory: true,
        productType: true,
        case: true,
      },
    });

    return products;
  }

  async createProduct(dto: CreateProductDto) {
    const {
      manufacturerId,
      productCategoryId,
      productTypeId,
      serialNumber,
      count,
    } = dto;

    const modelId = dto.modelId ?? undefined;
    const caliberId = dto.caliberId ?? undefined;

    const [manufacturer, productCategory, productType] = await Promise.all([
      this.prismaService.manufacturer.findUnique({
        where: { id: manufacturerId },
      }),
      this.prismaService.productCategory.findUnique({
        where: { id: productCategoryId },
      }),
      this.prismaService.productType.findUnique({
        where: { id: productTypeId },
      }),
    ]);

    if (!manufacturer) throw new NotFoundException("Производитель не найден");
    if (!productCategory) throw new NotFoundException("Категория не найдена");
    if (!productType) throw new NotFoundException("Тип продукта не найден");

    if (modelId) {
      const model = await this.prismaService.model.findUnique({
        where: { id: modelId },
      });

      if (!model) throw new NotFoundException("Модель не найдена");
    }

    if (caliberId) {
      const caliber = await this.prismaService.caliber.findUnique({
        where: { id: caliberId },
      });

      if (!caliber) throw new NotFoundException("Калибр не найден");
    }

    if (serialNumber) {
      const existingProducts = await this.prismaService.product.findMany({
        where: {
          manufacturerId,
          productCategoryId,
          serialNumber,
        },
      });

      if (existingProducts.length > 0) {
        throw new ConflictException(
          "Один или несколько серийных номеров уже существуют",
        );
      }
    }

    // if (serialNumbers && serialNumbers.length > 1) {
    //   const products = serialNumbers?.map((number) => {
    //     return {
    //       productTypeId,
    //       manufacturerId,
    //       productCategoryId,
    //       modelId,
    //       caliberId,
    //       count,
    //       serialNumber: number,
    //       caseId: dto.caseId ?? null,
    //     };
    //   });

    //   return await this.prismaService.product.createMany({ data: products });
    // }

    return await this.prismaService.product.create({
      data: {
        productTypeId,
        manufacturerId,
        modelId,
        productCategoryId,
        caliberId,
        count,
        serialNumber,
      },
    });
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const {
      manufacturerId,
      modelId,
      productCategoryId,
      productTypeId,
      caliberId,
      count,
      serialNumber,
      caseId,
    } = dto;

    const product = await this.getProductById(id);
    console.log(product);

    return await this.prismaService.product.update({
      where: { id: product.id },
      data: {
        manufacturerId,
        modelId: modelId ?? undefined,
        productCategoryId,
        productTypeId,
        caliberId: caliberId ?? undefined,
        count,
        serialNumber,
        caseId: caseId ?? undefined,
      },
    });
  }

  async deleteProduct(id: string) {
    const product = await this.getProductById(id);

    const deletedProduct = await this.prismaService.product.delete({
      where: { id: product.id },
    });

    return deletedProduct.id;
  }
}
