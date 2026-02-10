import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import * as fileType from "file-type";

@Injectable()
export class FileTypePipe implements PipeTransform {
  private readonly allowedTypes = ["pdf", "doc", "docx", "rtf"];

  async transform(files: Record<string, Express.Multer.File[]>) {
    for (const key in files) {
      for (const file of files[key]) {
        const type = await fileType.fileTypeFromBuffer(file.buffer);

        if (!type || !this.allowedTypes.includes(type.ext)) {
          throw new BadRequestException(
            `Файл ${file.originalname} имеет запрещенный формат`,
          );
        }
      }
      return files;
    }
  }
}
