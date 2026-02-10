import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class UTF8EncodingPipe implements PipeTransform {
  transform(files: Record<string, Express.Multer.File[]>) {
    for (const key in files) {
      const arr = files[key];

      for (const file of arr) {
        file.originalname = Buffer.from(file.originalname, "latin1").toString(
          "utf8",
        );
      }
    }

    return files;
  }
}
