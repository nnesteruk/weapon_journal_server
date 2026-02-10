import {
  BadRequestException,
  Injectable,
  type PipeTransform,
} from "@nestjs/common";

@Injectable()
export class MaxFileSizePipe implements PipeTransform {
  constructor(private readonly maxSize: number) {}

  transform(files: Record<string, Express.Multer.File[]>) {
    for (const key in files) {
      const arr = files[key];
      for (const file of arr) {
        if (file.size > this.maxSize) {
          throw new BadRequestException(
            `Файл ${file.originalname} не должен превышать 5 МБ`,
          );
        }
      }
    }

    return files;
  }
}
