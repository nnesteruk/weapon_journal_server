import type { DocumentsCategoryKey } from "@modules/file/files.types";
import { CreateProductDto } from "@modules/product/dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  Min,
} from "class-validator";
import { CaseState, LegalForm } from "./case.enum";
import type { CaseStateType, LegalFormType } from "./case.type";
import { DocumentsDto } from "./documents.dto";

export class CreateCaseDto {
  @ApiProperty({
    example: 123,
    description: "Номер дела",
    type: Number,
  })
  @Type(() => Number)
  @IsInt({ message: "Номер дела должен быть числом" })
  @IsNotEmpty({ message: "Номер дела обязателен" })
  caseNum: number;

  @ApiProperty({
    example: "2023-01-01",
    description: "Дата регистрации",
    type: String,
  })
  @Type(() => Date)
  @IsDate({ message: "Дата регистрации должна быть корректной датой" })
  @IsNotEmpty({ message: "Дата регистрации обязательна" })
  registerDate: Date;

  @ApiProperty({
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор заявителя",
    type: String,
  })
  @IsUUID("4", { message: "ID заявителя должен быть UUID v4" })
  @IsNotEmpty({ message: "ID заявителя обязателен" })
  applicantId: string;

  @ApiProperty({
    example: "legal",
    description:
      "Тип заявителя: 'legal' (юр. лицо), 'self-employed' (самозанятый) или 'individual' (физ. лицо)",
    enum: LegalForm,
  })
  @IsNotEmpty({ message: "Поле legalForm обязательно" })
  @IsEnum(LegalForm, {
    message:
      "Поле legalForm должно быть'LEGAL','INDIVIDUAL' или 'SELF_EMPLOYED'",
  })
  legalForm: LegalFormType;

  @ApiProperty({
    example: "CN-1234",
    description: "Номер контракта",
    type: String,
  })
  @IsString()
  @Length(1, 50, { message: "Номер контракта должен быть от 1 до 50 символов" })
  @IsNotEmpty({ message: "Номер контракта обязателен" })
  contractNum: string;

  @ApiProperty({
    example: "2023-01-01",
    description: "Дата контракта",
    type: String,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "Дата контракта должна быть корректной датой" })
  contractDate?: Date;

  @ApiProperty({
    example: 10000,
    description: "Сумма контракта",
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: "Сумма контракта должна быть числом" },
  )
  @Min(0, { message: "Сумма контракта должна быть больше или равна 0" })
  contractSum?: number;

  @ApiProperty({
    example: "PAY-4567",
    description: "Номер платежа",
    type: String,
  })
  @IsOptional()
  @IsString()
  paymentNum?: string;

  @ApiProperty({
    example: "2023-01-02",
    description: "Дата платежа",
    type: String,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "Дата платежа должна быть корректной датой" })
  contractPaymentDate?: Date;

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
    description: "Документы (массив объектов с данными о документе)",
    required: false,
  })
  @IsOptional()
  @IsArray()
  documents?: DocumentsDto[];

  @ApiProperty({
    example: {
      DocumentsCategoryKey: 1,
    },
    description: "Количество документов по категориям",
    required: false,
  })
  @Transform(
    ({
      value,
    }: {
      value?: string;
    }): { [key in DocumentsCategoryKey]: number } => {
      const parsedValue: { [key in DocumentsCategoryKey]: number } =
        value && JSON.parse(value);

      return parsedValue;
    },
  )
  @IsOptional()
  documentsCount?: {
    [key in DocumentsCategoryKey]: number;
  };

  @ApiProperty({
    example: "Причина отказа...",
    description: "Комментарий к отказу",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  refusalComment?: string;

  @ApiProperty({
    example: "SERT-2025-001",
    description: "Номер сертификата",
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  sertifNum?: string;

  @ApiProperty({
    example: "В работе",
    description: "Текущее состояние дела",

    type: String,
    enum: CaseState,
  })
  @IsNotEmpty({ message: "Поле stateApplication обязательно" })
  @IsEnum(CaseState, {
    message: "Текущее состояние дела должно быть ACTIVE, COMPLETED или REFUSED",
  })
  stateApplication: CaseStateType;

  @ApiProperty({
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор исполнителя",
    type: String,
    required: false,
  })
  @IsOptional()
  userId?: string;

  @ApiProperty({
    example: "2023-02-01",
    description: "Дата срока оплаты",
    type: String,
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: "Дата срока оплаты должна быть корректной датой" })
  paymentDeadline?: Date;

  @ApiProperty({
    example: [
      {
        id: "2ba76989-072a-w46ce-9229-1e9d04e1fdad",
        caseId: "7c1b5a48-6fa1-4c63-8d16-c5e984f7e3a7",
        productTypeId: "d56a4180-65aa-42ec-a945-5fd21dec0538",
        productCategoryId: "4a69b43b-9a3a-41ac-91f5-6e5cc066a234",
        manufacturerId: "1f52e6c3-90ff-4a2a-bbde-492e58bfb5fa",
        modelId: "3b7a72e8-97fa-4d5d-90d3-210ad6dfe0ff",
        caliberId: "3b7a72e8-97fa-4d5d-90d3-210ad6dfe0ff",
        serialNumber: "SN12345",
        count: 1,
      },
    ],
  })
  @IsArray()
  @Transform(({ value }: { value: string }): CreateProductDto[] =>
    JSON.parse(value),
  )
  @IsOptional()
  products?: (CreateProductDto & { id: string })[];
}
