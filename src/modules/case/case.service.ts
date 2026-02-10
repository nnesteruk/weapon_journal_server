import { FileService } from "@modules/file/file.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { isUUID } from "class-validator";
import * as fs from "fs";
import * as path from "path";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCaseDto, UpdateCaseDto } from "./dto";
import { GetCaseQueryListDto } from "./dto/get-case-query-list.dto";

@Injectable()
export class CaseService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
  ) {}

  async getAllCases(query: GetCaseQueryListDto) {
    return await this.prismaService.case.findMany({
      where: {
        ...(query.state && { stateApplication: query.state }),
        registerDate: {
          ...(query.dateFrom && { gte: new Date(query.dateFrom) }),
          ...(query.dateTo && { lte: new Date(query.dateTo) }),
        },
      },
      omit: {
        createdAt: true,
        updatedAt: true,
        applicantId: true,
        userId: true,
      },
      include: {
        applicant: { omit: { createdAt: true, updatedAt: true } },
        products: {
          omit: {
            createdAt: true,
            updatedAt: true,
            caliberId: true,
            manufacturerId: true,
            modelId: true,
            productCategoryId: true,
            productTypeId: true,
          },
          include: {
            caliber: { omit: { createdAt: true, updatedAt: true } },
            model: { omit: { createdAt: true, updatedAt: true } },
            productCategory: { omit: { createdAt: true, updatedAt: true } },
            productType: { omit: { createdAt: true, updatedAt: true } },
            manufacturer: { omit: { createdAt: true, updatedAt: true } },
          },
        },
        user: { omit: { createdAt: true, updatedAt: true } },
        documents: { omit: { createdAt: true, updatedAt: true } },
        documentsCount: { omit: { createdAt: true, updatedAt: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getCaseById(id: string) {
    const existedCase = await this.prismaService.case.findUnique({
      where: { id },
    });

    if (!existedCase) {
      throw new NotFoundException("Дело не найдено");
    }

    return existedCase;
  }

  async uploadFile(
    caseId: string,
    files: Record<string, Express.Multer.File[]>,
  ) {
    const uploadDir = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      String(caseId),
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (const key in files) {
      const categoryFiles = files[key];

      if (!categoryFiles.length) continue;

      const categoryDir = path.join(uploadDir, key);

      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }

      for (const file of categoryFiles) {
        const fileNameEncoded = Buffer.from(
          file.originalname,
          "latin1",
        ).toString("utf8");

        const uniqueName = `${Date.now()}-${fileNameEncoded}`;

        const filePath = path.join(categoryDir, uniqueName);

        fs.writeFileSync(filePath, file.buffer);

        const relativePath = `${this.configService.getOrThrow("DOCUMENT_PATH")}/${caseId}/${key}/${uniqueName}`;

        await this.prismaService.documents.create({
          data: {
            category: key,
            fileName: uniqueName,
            filePath: relativePath,
            caseId,
          },
        });
      }
    }
  }

  async createCase(
    dto: CreateCaseDto,
    files: Record<string, Express.Multer.File[]>,
  ) {
    const {
      caseNum,
      registerDate,
      applicantId,
      legalForm,
      contractNum,
      contractDate,
      contractSum,
      paymentNum,
      contractPaymentDate,
      userId,
      stateApplication,
      refusalComment,
      paymentDeadline,
      sertifNum,
      documentsCount,
      products,
    } = dto;

    const [applicant] = await Promise.all([
      this.prismaService.applicant.findUnique({ where: { id: applicantId } }),
    ]);

    if (userId) {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException("Исполнитель не найден");
      }
    }

    if (!applicant) {
      throw new NotFoundException("Заявитель не найден");
    }

    if (!legalForm) {
      throw new NotFoundException(
        "Поле legalForm должно быть либо 'Юридическое лицо', либо 'Физическое лицо', либо 'Индивидуальный предприниматель'",
      );
    }

    const createdCase = await this.prismaService.case.create({
      data: {
        caseNum,
        registerDate,
        applicantId,
        legalForm,
        contractNum,
        stateApplication,
        refusalComment,
        paymentDeadline,
        userId: userId || undefined,
        sertifNum,
        contractDate,
        contractSum,
        paymentNum,
        contractPaymentDate,
        documentsCount: documentsCount
          ? {
              create: Object.entries(documentsCount)?.map(([key, value]) => ({
                category: key,
                count: value,
              })),
            }
          : undefined,
        products: products?.length
          ? {
              create: products?.map((product) => ({
                manufacturerId: product.manufacturerId,
                modelId: product.modelId,
                productCategoryId: product.productCategoryId,
                productTypeId: product.productTypeId,
                caliberId: product.caliberId,
                count: product.count,
                serialNumber: product.serialNumber,
              })),
            }
          : undefined,
      },
    });

    await this.fileService.uploadFile(createdCase.id, files);
  }

  async updateCase(
    id: string,
    dto: UpdateCaseDto,
    files: Record<string, Express.Multer.File[]>,
  ) {
    const {
      caseNum,
      registerDate,
      applicantId,
      legalForm,
      contractNum,
      contractDate,
      contractSum,
      paymentNum,
      contractPaymentDate,
      products,
      stateApplication,
      refusalComment,
      paymentDeadline,
      userId,
      sertifNum,
      documentsCount,
    } = dto;

    const existedCase = await this.getCaseById(id);

    const result = await this.prismaService.$transaction(async (prisma) => {
      const updatedCase = await prisma.case.update({
        where: { id: existedCase.id },
        data: {
          caseNum,
          registerDate,
          applicantId,
          legalForm,
          contractNum,
          contractDate,
          contractSum,
          paymentNum,
          contractPaymentDate,
          stateApplication,
          refusalComment,
          paymentDeadline,
          userId,
          sertifNum,
        },
      });

      if (products?.length) {
        const existingIds = products.map((product) => product.id);
        console.log(existingIds);

        await prisma.product.deleteMany({
          where: {
            caseId: updatedCase.id,
            id: {
              notIn: existingIds,
            },
          },
        });

        for (const product of products) {
          if (isUUID(product.id)) {
            await prisma.product.update({
              where: { id: product.id },
              data: {
                caseId: updatedCase.id,
                productCategoryId: product.productCategoryId,
                productTypeId: product.productTypeId,
                caliberId: product.caliberId ?? null,
                manufacturerId: product.manufacturerId ?? null,
                modelId: product.modelId ?? null,
                count: product.count,
                serialNumber: product.serialNumber ?? null,
              },
            });
          } else {
            await prisma.product.create({
              data: {
                caseId: updatedCase.id,
                productCategoryId: product.productCategoryId,
                productTypeId: product.productTypeId,
                caliberId: product.caliberId ?? null,
                manufacturerId: product.manufacturerId ?? null,
                modelId: product.modelId ?? null,
                count: product.count,
                serialNumber: product.serialNumber ?? null,
              },
            });
          }
        }
      }

      if (documentsCount) {
        for (const [key, value] of Object.entries(documentsCount)) {
          await prisma.documentsCount.upsert({
            where: {
              caseId_category: { caseId: updatedCase.id, category: key },
            },
            update: { count: value },
            create: { caseId: updatedCase.id, category: key, count: value },
          });
        }
      }

      return updatedCase;
    });

    if (files) {
      await this.fileService.uploadFile(result.id, files);
    }

    return result;
  }

  async deleteCase(id: string) {
    const existedCase = await this.getCaseById(id);

    const deletedCase = await this.prismaService.case.delete({
      where: { id: existedCase.id },
    });

    return deletedCase.id;
  }
}
