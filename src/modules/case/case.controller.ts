import { Roles } from "@common/decorators";
import { ApiCommonResponses } from "@common/decorators/api-common-responses.decorator";
import { AuthGuard } from "@common/guards";
import { DOCUMENTS_CATEGORIES } from "@modules/file/file.constants";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { CaseService } from "./case.service";
import { CreateCaseDto, ResponseCaseDto, UpdateCaseDto } from "./dto";
import { GetCaseQueryListDto } from "./dto/get-case-query-list.dto";

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Roles(Role.ADMIN, Role.USER)
@Controller("case")
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @ApiOkResponse({
    description: "Список дел",
    type: [ResponseCaseDto],
  })
  @ApiOperation({
    summary: "Получение списка дел",
    description: "Получает список дел",
  })
  @ApiCommonResponses()
  @Get()
  async getAllCase(@Query() query: GetCaseQueryListDto) {
    return await this.caseService.getAllCases(query);
  }

  @ApiOkResponse({
    description: "Создание дела",
    type: ResponseCaseDto,
  })
  @ApiOperation({
    summary: "Создание дела",
    description: "Создает дело",
  })
  @ApiCommonResponses()
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      DOCUMENTS_CATEGORIES.map((item) => ({
        name: item.key,
        maxCount: 2,
      })),
      {
        fileFilter(_, file, callback) {
          file.originalname = Buffer.from(file.originalname, "latin1").toString(
            "utf8",
          );
          callback(null, true);
        },
      },
    ),
  )
  async createCase(
    @Body() dto: CreateCaseDto,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
  ) {
    return await this.caseService.createCase(dto, files);
  }

  @ApiOkResponse({
    description: "Обновление дела",
    type: ResponseCaseDto,
  })
  @ApiOperation({
    summary: "Обновление дела",
    description: "Обновляет дело",
  })
  @ApiParam({
    name: "id",
    description: "ID дела",
    example: "7c1b5a48-6fa1-4c63-8d16-c5e984f7e3a7",
  })
  @ApiCommonResponses("Дело")
  @Patch(":id")
  @UseInterceptors(
    FileFieldsInterceptor(
      DOCUMENTS_CATEGORIES.map((item) => ({
        name: item.key,
        maxCount: 2,
      })),
      {
        fileFilter(_, file, callback) {
          file.originalname = Buffer.from(file.originalname, "latin1").toString(
            "utf8",
          );
          callback(null, true);
        },
      },
    ),
  )
  async updateCase(
    @Param("id") id: string,
    @Body() dto: UpdateCaseDto,
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
  ) {
    return await this.caseService.updateCase(id, dto, files);
  }

  @ApiOkResponse({
    description: "Удаление дела",
    type: ResponseCaseDto,
  })
  @ApiOperation({
    summary: "Удаление дела",
    description: "Удаляет дело",
  })
  @ApiParam({
    name: "id",
    description: "ID дела",
    example: "7c1b5a48-6fa1-4c63-8d16-c5e984f7e3a7",
  })
  @ApiCommonResponses("Дело")
  @Delete(":id")
  async deleteCase(@Param("id") id: string) {
    return await this.caseService.deleteCase(id);
  }
}
