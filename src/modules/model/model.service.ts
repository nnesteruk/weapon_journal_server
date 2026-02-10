import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateModelDto } from "./dto/create-model.dto";
import { UpdateModelDto } from "./dto/update-model.dto";

@Injectable()
export class ModelService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllModels() {
    return await this.prismaService.model.findMany({
      select: {
        id: true,
        modelName: true,
        productType: {
          select: {
            id: true,
            productType: true,
          },
        },
        productCategory: {
          select: {
            id: true,
            categoryName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getAllModelsByCategory(categoryId: string) {
    const models = await this.prismaService.model.findMany({
      where: { productCategoryId: categoryId },
    });

    if (!models) {
      throw new NotFoundException("Модели не найдены");
    }

    return models;
  }

  async getModelById(id: string) {
    const model = await this.prismaService.model.findUnique({ where: { id } });

    if (!model) throw new NotFoundException("Модель не найдена");

    return model;
  }

  async createModel(dto: CreateModelDto) {
    const { productCategoryId, productTypeId, modelName } = dto;

    const productType = await this.prismaService.productType.findUnique({
      where: { id: productTypeId },
    });

    if (!productType) throw new NotFoundException("Тип продукта не найден");

    const productCategory = await this.prismaService.productCategory.findUnique(
      {
        where: { id: productCategoryId },
      },
    );

    if (!productCategory)
      throw new NotFoundException("Категория продукта не найдена");

    const existingModel = await this.prismaService.model.findUnique({
      where: {
        modelName_productCategoryId_productTypeId: {
          modelName,
          productCategoryId,
          productTypeId,
        },
      },
    });

    if (existingModel) throw new ConflictException("Модель уже существует");

    return await this.prismaService.model.create({
      data: { modelName, productTypeId, productCategoryId },
    });
  }

  async updateModel(id: string, dto: UpdateModelDto) {
    const { productCategoryId, productTypeId, modelName } = dto;

    const productType = await this.prismaService.productType.findUnique({
      where: { id: productTypeId },
    });

    if (!productType) throw new NotFoundException("Тип продукта не найден");

    const productCategory = await this.prismaService.productCategory.findUnique(
      {
        where: { id: productCategoryId },
      },
    );

    if (!productCategory)
      throw new NotFoundException("Категория продукта не найдена");

    return await this.prismaService.model.update({
      where: { id },
      data: { modelName, productTypeId, productCategoryId },
    });
  }

  async deleteModel(id: string) {
    const model = await this.getModelById(id);

    const deletedModel = await this.prismaService.model.delete({
      where: { id: model.id },
    });

    return deletedModel.id;
  }
}
