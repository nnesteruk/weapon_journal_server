import { ResponseProductTypeDto } from "@modules/product-type/dto";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseCaliberDto {
  @ApiProperty({
    example: "2ba76989-072a-46ce-9229-1e9d04e1fdad",
    description: "Уникальный идентификатор калибра",
  })
  id: string;

  @ApiProperty({
    example: "4,5",
    description: "Калибр (наименование)",
  })
  name: string;

  @ApiProperty({ type: () => ResponseProductTypeDto })
  productType?: ResponseProductTypeDto;
}
