import { ResponseCaliberDto } from "@modules/caliber/dto";
import { ApiProperty } from "@nestjs/swagger";
import { ResponseManufacturerDto } from "src/modules/manufacturer/dto";
import { ResponseModelDto } from "src/modules/model/dto";
import { ResponseProductCategoryDto } from "src/modules/product-category/dto";
import { ResponseProductTypeDto } from "src/modules/product-type/dto";

export class ResponseProductDto {
  @ApiProperty({
    description: "ID продукта",
    example: "7c1b5a48-6fa1-4c63-8d16-c5e984f7e3a7",
  })
  id: string;

  @ApiProperty({
    description: "Тип продукта (объект)",
    example: {
      id: "d56a4180-65aa-42ec-a945-5fd21dec0538",
      productType: "Огнестрельное оружие",
    },
  })
  productType?: ResponseProductTypeDto;

  @ApiProperty({
    description: "Категория продукта (объект)",
    example: {
      id: "4a69b43b-9a3a-41ac-91f5-6e5cc066a234",
      categoryName: "Пистолеты",
    },
  })
  productCategory?: ResponseProductCategoryDto;

  @ApiProperty({
    description: "Производитель (объект)",
    example: {
      id: "1f52e6c3-90ff-4a2a-bbde-492e58bfb5fa",
      name: "Beretta",
      country: "Италия",
    },
  })
  manufacturer?: ResponseManufacturerDto;

  @ApiProperty({
    description: "Модель (объект)",
    example: {
      id: "3b7a72e8-97fa-4d5d-90d3-210ad6dfe0ff",
      modelName: "M9",
      serialNumber: "SN12345",
    },
  })
  model?: ResponseModelDto;

  @ApiProperty({
    description: "Калибр (объект)",
    example: {
      id: "3b7a72e8-97fa-4d5d-90d3-210ad6dfe0ff",
      caliber: "9x19",
    },
  })
  caliber?: ResponseCaliberDto;

  @ApiProperty({
    description: "Заводской номер",
    example: "[991435495]",
    type: [String],
  })
  serialNumbers?: string[];

  @ApiProperty({
    description: "Количество продуктов",
    example: "30",
    type: Number,
  })
  count: number;

  @ApiProperty({
    description: "ID дела",
    example: "3b7a72e8-97fa-4d5d-90d3-210ad6dfe0ff",
    type: String,
  })
  caseId?: string;
}
