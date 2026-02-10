import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { CreateApplicantDto, UpdateApplicantDto } from "./dto";

@Injectable()
export class ApplicantService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllApplicants() {
    return this.prismaService.applicant.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async getApplicantById(id: string) {
    const applicant = await this.prismaService.applicant.findUnique({
      where: { id },
    });

    if (!applicant) {
      throw new NotFoundException("Заявитель не найден");
    }

    return applicant;
  }

  async createApplicant(dto: CreateApplicantDto) {
    const { fullName } = dto;

    const existApplicant = await this.prismaService.applicant.findUnique({
      where: { fullName },
    });

    if (existApplicant) {
      throw new ConflictException("Заявитель с таким именем уже существует");
    }

    return this.prismaService.applicant.create({
      data: { fullName },
    });
  }

  async updateApplicant(id: string, dto: UpdateApplicantDto) {
    const { fullName } = dto;

    const applicant = await this.getApplicantById(id);

    return this.prismaService.applicant.update({
      where: { id: applicant.id },
      data: { fullName: fullName },
    });
  }

  async deleteApplicant(id: string) {
    const applicant = await this.getApplicantById(id);

    const deletedApplicant = await this.prismaService.applicant.delete({
      where: { id: applicant.id },
    });

    return deletedApplicant.id;
  }
}
