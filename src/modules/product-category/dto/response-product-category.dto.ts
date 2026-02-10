import { ApiProperty } from "@nestjs/swagger";
import { ResponseProductTypeDto } from "src/modules/product-type/dto";

export class ResponseProductCategoryDto {
  @ApiProperty({
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор категории продукта",
  })
  id: string;

  // @ApiProperty({
  //   example: "214c8d5e-2b4d-4c6d-8a1a-4c8d5e2b4d4c",
  //   description: "Уникальный идентификатор типа продукта",
  // })
  // productTypeId: string;

  @ApiProperty({
    example: "Пистолеты",
    description: "Категория продукта (наименование)",
  })
  categoryName: string;

  @ApiProperty({ type: () => ResponseProductTypeDto })
  productType?: ResponseProductTypeDto;
}
