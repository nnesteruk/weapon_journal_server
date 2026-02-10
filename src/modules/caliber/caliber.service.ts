import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCaliberDto, UpdateCaliberDto } from "./dto";

@Injectable()
export class CaliberService {
  private readonly logger = new Logger(CaliberService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getAllCalibers() {
    return await this.prismaService.caliber.findMany({
      select: {
        id: true,
        name: true,
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

  async getCaliberByTypeId(productTypeId: string) {
    const calibers = await this.prismaService.caliber.findMany({
      where: { productTypeId },
    });

    if (!calibers) {
      throw new NotFoundException("Калибры не найдены");
    }

    return calibers;
  }

  async getCaliberById(id: string) {
    const caliber = await this.prismaService.caliber.findUnique({
      where: { id },
    });

    if (!caliber) {
      throw new NotFoundException("Калибр не найден");
    }

    return caliber;
  }

  async createCaliber(dto: CreateCaliberDto) {
    const { productTypeId, name } = dto;

    const category = await this.prismaService.productType.findUnique({
      where: { id: productTypeId },
    });

    this.logger.log(`Found caliber with id: ${JSON.stringify(category)}`);

    if (!category) {
      throw new NotFoundException("Категория продукта не найдена");
    }

    const existedCaliber = await this.prismaService.caliber.findUnique({
      where: { productTypeId_name: { name, productTypeId } },
    });

    if (existedCaliber) {
      throw new NotFoundException("Калибр с таким названием уже существует");
    }

    return await this.prismaService.caliber.create({
      data: { name, productTypeId },
    });
  }

  async updateCaliber(id: string, dto: UpdateCaliberDto) {
    const { productTypeId, name } = dto;

    const caliber = await this.getCaliberById(id);

    return await this.prismaService.caliber.update({
      where: { id: caliber.id },
      data: { name, productTypeId },
    });
  }

  async deleteCaliber(id: string) {
    const caliber = await this.getCaliberById(id);

    const deletedCaliber = await this.prismaService.caliber.delete({
      where: { id: caliber.id },
    });

    return deletedCaliber.id;
  }
}
