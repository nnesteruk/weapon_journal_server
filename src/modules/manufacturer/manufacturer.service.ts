import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateManufacturerDto, UpdateManufacturerDto } from "./dto";

@Injectable()
export class ManufacturerService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllManufacturers() {
    return await this.prismaService.manufacturer.findMany({
      omit: { createdAt: true, updatedAt: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getManufacturerById(id: string) {
    const manufacturer = await this.prismaService.manufacturer.findUnique({
      where: { id },
    });

    if (!manufacturer) {
      throw new NotFoundException("Производитель не найден");
    }

    return manufacturer;
  }

  async createManufacturer(dto: CreateManufacturerDto) {
    const { name, country } = dto;

    const existManufacturer = await this.prismaService.manufacturer.findUnique({
      where: { name_country: { name, country } },
    });

    if (existManufacturer) {
      throw new ConflictException(
        "Производитель с таким названием уже существует",
      );
    }

    return await this.prismaService.manufacturer.create({
      data: { name, country },
    });
  }

  async updateManufacturer(id: string, dto: UpdateManufacturerDto) {
    const { name, country } = dto;

    const manufacturer = await this.getManufacturerById(id);

    return await this.prismaService.manufacturer.update({
      where: { id: manufacturer.id },
      data: { name, country },
    });
  }

  async deleteManufacturer(id: string) {
    const manufacturer = await this.getManufacturerById(id);

    const deletedManufacturer = await this.prismaService.manufacturer.delete({
      where: { id: manufacturer.id },
    });

    return deletedManufacturer.id;
  }
}
