import { DocumentsCategoryKey } from "@modules/file/files.types";
import { ResponseUserDto } from "@modules/user/dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { ResponseApplicantDto } from "src/modules/applicant/dto";
import { ResponseProductDto } from "src/modules/product/dto";
import { CaseState, LegalForm } from "./case.enum";
import type { CaseStateType, LegalFormType } from "./case.type";
import { DocumentsDto } from "./documents.dto";

export class ResponseCaseDto {
  @ApiProperty({
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор дела",
    type: String,
  })
  id: string;

  @ApiProperty({
    example: 123,
    description: "Номер дела",
    type: Number,
  })
  caseNum: number;

  @ApiProperty({
    example: "2023-01-01",
    description: "Дата регистрации",
    type: String,
  })
  registerDate: Date;

  @ApiProperty({ type: () => ResponseApplicantDto })
  applicant: ResponseApplicantDto;

  @ApiProperty({
    example: LegalForm.LEGAL,
    description: "Тип заявителя ('LEGAL' — юр. лицо, 'INDIVIDUAL' — физ. лицо)",
    enum: LegalForm,
    type: String,
  })
  @IsEnum(LegalForm, {
    message: "Тип заявителя должен быть LEGAL или INDIVIDUAL",
  })
  legalForm: LegalFormType;

  @ApiProperty({
    example: "CN-1235",
    description: "Номер контракта",
    type: String,
  })
  contractNum: string;

  @ApiProperty({
    example: "2023-01-01",
    description: "Дата контракта",
    type: String,
  })
  contractDate?: Date;

  @ApiProperty({
    example: 1000,
    description: "Сумма контракта",
    type: Number,
  })
  contractSum?: number;

  @ApiProperty({
    example: "PAY-1234",
    description: "Номер платежа",
    type: String,
  })
  paymentNum: string;

  @ApiProperty({
    example: "2023-01-01",
    description: "Дата платежа",
    type: String,
  })
  contractPaymentDate?: Date;

  @ApiProperty({ type: () => ResponseProductDto })
  product: ResponseProductDto;

  @ApiProperty({
    example: "В работе",
    description: "Текущее состояние дела",
    type: String,

    enum: CaseState,
  })
  stateApplication: CaseStateType;

  @ApiProperty({
    example: [
      {
        id: "123",
        caseId: "7c1b5a48-6fa1-4c63-8d16-c5e984f7e3a7",
        category: "answer",
        fileName: "document.pdf",
        filePath: "path/to/document.pdf",
      },
    ],
    description: "Документы (если есть)",
    type: [DocumentsDto],
    required: false,
  })
  documents?: DocumentsDto[];

  @ApiProperty({
    example: {
      DocumentsCategoryKey: 1,
    },
    description: "Количество документов по категориям",
    required: false,
  })
  documentsCount?: {
    [key in DocumentsCategoryKey]: number;
  };

  @ApiProperty({
    example: "Комментарий к отказу",
    description: "Комментарий к отказу (если есть)",
    type: String,
    required: false,
  })
  refusalComment?: string;

  @ApiProperty({
    example: "SERT-001",
    description: "Номер сертификата",
    type: String,
    required: false,
  })
  sertifNum?: string;

  @ApiProperty({ type: () => ResponseUserDto, required: false })
  user?: ResponseUserDto;

  @ApiProperty({
    example: "2023-01-10",
    description: "Дата срока оплаты",
    type: String,
    required: false,
  })
  paymentDeadline?: Date;

  @ApiProperty({
    example: [
      {
        id: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
        caseId: "7c1b5a48-6fa1-4c63-8d16-c5e984f7e3a7",
        productType: {
          id: "d56a4180-65aa-42ec-a945-5fd21dec0538",
          productType: "Огнестрельное оружие",
        },
        productCategory: {
          id: "4a69b43b-9a3a-41ac-91f5-6e5cc066a234",
          categoryName: "Пистолеты",
        },
        manufacturer: {
          id: "1f52e6c3-90ff-4a2a-bbde-492e58bfb5fa",
          name: "Beretta",
          country: "Италия",
        },
        model: {
          id: "3b7a72e8-97fa-4d5d-90d3-210ad6dfe0ff",
          modelName: "M9",
          serialNumber: "SN12345",
        },
        caliber: {
          id: "3b7a72e8-97fa-4d5d-90d3-210ad6dfe0ff",
          caliber: "9x19",
        },
        serialNumber: "SN12345",
        count: 1,
      },
    ],
  })
  products?: ResponseProductDto[];
}
