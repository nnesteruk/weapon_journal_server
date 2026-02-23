import { PrismaService } from "@modules/prisma/prisma.service";
import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import fs from "fs";
import path from "path";

@Injectable()
export class FileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private uploadDir = path.join(__dirname, "..", "..", "..", "uploads");

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
        const uniqueName = `${Date.now()}-${file.originalname}`;

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

  async downloadFile(res: Response, id: string) {
    const file = await this.prismaService.documents.findUnique({
      where: { id },
    });

    if (!file) {
      throw new NotFoundException("Файл не найден");
    }

    const filePath = path.join(
      this.uploadDir,
      file.caseId,
      file.category,
      file.fileName,
    );

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException("Файл не найден");
    }

    const response = res.download(filePath);

    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  async deleteFile(id: string) {
    const file = await this.prismaService.documents.findUnique({
      where: { id },
    });

    if (!file) {
      throw new NotFoundException("Файл не найден");
    }

    const filePath = path.join(
      this.uploadDir,
      file.caseId,
      file.category,
      file.fileName,
    );

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException("Файл не найден");
    }

    fs.rmSync(filePath);

    await this.prismaService.documents.delete({ where: { id } });
  }
}
