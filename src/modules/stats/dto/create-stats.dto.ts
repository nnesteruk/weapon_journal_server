import { ResponseCaseDto } from "@modules/case/dto";
import { ApiProperty } from "@nestjs/swagger";

type DocumentByCategory = {
  category: string;
  count: number;
};

type ProductByType = {
  productsType: string;
  total: number;
};

export class ResponseStatsDto {
  @ApiProperty({
    example: 1000,
    description: "Общая сумма договоров",
    type: Number,
  })
  totalContractSum: number;

  @ApiProperty({
    example: [
      {
        category: "answer",
        count: 3,
      },
      {
        category: "contract",
        count: 5,
      },
    ],
    description: "Общее количество оружия по типу",
    type: Number,
  })
  productsByType: ProductByType[];

  @ApiProperty({
    example: 17,
    description: "Общее количество оружия",
    type: Number,
  })
  totalProductsByType: number;

  @ApiProperty({
    example: 17,
    description: "Общее количество дел",
    type: Number,
  })
  totalCases: number;

  @ApiProperty({
    example: 3,
    description: "Общее количество идентификаций",
    type: Number,
  })
  totalIdentifications: number;

  @ApiProperty({
    example: 15,
    description: "Общее количество документов",
    type: Number,
  })
  totalDocuments: number;

  @ApiProperty({
    example: [
      {
        category: "answer",
        count: 3,
      },
      {
        category: "contract",
        count: 5,
      },
    ],
    description: "Общее количество документов по категориям",
    type: Array,
  })
  documents: DocumentByCategory[];

  @ApiProperty({
    example: [
      {
        applicantId: "693de353-5c1b-4e58-b12e-de5e97b8a488",
        caseNum: 1325,
        contractDate: null,
        contractNum: "12351235",
        contractPaymentDate: null,
        contractSum: 0,
        createdAt: "2026-02-09T07:37:25.497Z",
        id: "7e6f3ae7-8a58-440a-b845-71c8f49b9209",
        legalForm: "INDIVIDUAL",
        paymentDeadline: null,
        paymentNum: "",
        refusalComment: "Отказано и всё\r\n",
        registerDate: "2026-02-09T00:00:00.000Z",
        sertifNum: null,
        stateApplication: "REFUSED",
        updatedAt: "2026-02-16T12:35:16.760Z",
        userId: null,
      },
    ],
    description: "Дела с отказом",
    type: Array,
  })
  refusesCase: ResponseCaseDto[];
}
