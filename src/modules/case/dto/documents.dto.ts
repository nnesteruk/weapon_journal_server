import { ApiProperty } from "@nestjs/swagger";

export class DocumentsDto {
  @ApiProperty({
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор документа",
    type: String,
  })
  id: string;

  @ApiProperty({
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор дела",
    type: String,
  })
  caseId: string;

  @ApiProperty({
    example: "answer",
    description: "Категория документа",
    type: String,
  })
  category: string;

  @ApiProperty({
    example: "1764686120417-1.docx",
    description: "Название документа",
    type: String,
  })
  fileName: string;

  @ApiProperty({
    example: "uploads/2a34a21f-f1f3-4447-be91-0/answer/...",
    description: "Ссылка на документ",
    type: String,
  })
  filePath: string;
}
