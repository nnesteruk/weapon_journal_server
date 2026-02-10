import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    description: "ID типа продукта",
    example: "d56a4180-65aa-42ec-a945-5fd21dec0538",
  })
  @IsUUID("4", { message: "ID продукта должен быть UUID v4" })
  @IsNotEmpty({ message: "Тип продукта обязателен" })
  productTypeId: string;

  @ApiProperty({
    description: "ID категории продукта",
    example: "4a69b43b-9a3a-41ac-91f5-6e5cc066a234",
  })
  @IsUUID("4", { message: "ID категории продукта должен быть UUID v4" })
  @IsNotEmpty({ message: "Категория продукта обязательна" })
  productCategoryId: string;

  @ApiProperty({
    description: "ID модели",
    example: "3b7a72e8-97fa-4d5d-90d3-210ad6dfe0ff",
  })
  @IsOptional()
  modelId?: string;

  @ApiProperty({
    description: "ID калибра",
    example: "3b7a72e8-97fa-4d5d-90d3-210ad6dfe0ff",
  })
  @IsOptional()
  caliberId?: string;

  @ApiProperty({
    description: "ID производителя",
    example: "1f52e6c3-90ff-4a2a-bbde-492e58bfb5fa",
  })
  @IsUUID("4", { message: "ID продукта должен быть UUID v4" })
  @IsOptional()
  manufacturerId?: string;

  @ApiProperty({
    description: "Серийный номер",
    example: "124425",
    type: String,
  })
  @IsString({ message: "Серийный номер должен быть строкой" })
  @IsOptional()
  serialNumber?: string;

  @ApiProperty({
    description: "Количество продуктов",
    example: "30",
    type: Number,
  })
  @IsInt()
  @IsPositive({ message: "Количество продуктов должно быть положительным" })
  @IsNotEmpty({ message: "Количество продуктов обязательно" })
  count: number;

  @ApiProperty({
    description: "ID дела",
    example: "3b7a72e8-97fa-4d5d-90d3-210ad6dfe0ff",
    type: String,
    required: false,
  })
  @IsOptional()
  caseId?: string;
}
