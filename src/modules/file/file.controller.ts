import { Roles } from "@common/decorators";
import { AuthGuard } from "@common/guards";
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Role } from "@prisma/client";
import { type Response } from "express";
import { DOCUMENTS_CATEGORIES } from "./file.constants";
import { FileService } from "./file.service";
import { FileTypePipe } from "./pipes/file-type.pipe";
import { MaxFileSizePipe } from "./pipes/max-file-size.pipe";

@UseGuards(AuthGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post(":caseId/:category")
  @UseInterceptors(
    FileFieldsInterceptor(
      DOCUMENTS_CATEGORIES.map((item) => ({
        name: item.key,
        maxCount: 2,
      })),
      {
        fileFilter(_, file, callback) {
          console.log(file);
          file.originalname = Buffer.from(file.originalname, "latin1").toString(
            "utf8",
          );
          callback(null, true);
        },
      },
    ),
  )
  uploadFiles(
    @Param("caseId") caseId: string,
    @UploadedFiles(new MaxFileSizePipe(200 * 1024 * 1024), new FileTypePipe())
    files: Record<string, Express.Multer.File[]>,
  ) {
    return this.fileService.uploadFile(caseId, files);
  }

  @Get(":documentId")
  downloadFile(@Res() res: Response, @Param("documentId") id: string) {
    return this.fileService.downloadFile(res, id);
  }

  @Delete(":documentId")
  deleteFile(@Param("documentId") id: string) {
    return this.fileService.deleteFile(id);
  }
}
