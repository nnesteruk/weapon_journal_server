import { PrismaService } from "@modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { GetStatsQueryListDto } from "./dto/get-stats-query-list.dto";
import { ProductByType } from "./interfaces/types";

@Injectable()
export class StatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStats(query: GetStatsQueryListDto) {
    const totalCases = await this.prismaService.case.count({
      where: {
        registerDate: {
          gte: query.startDate,
          lte: query.endDate,
        },
      },
    });

    const productsByType = await this.prismaService.$queryRaw<ProductByType[]>`
    SELECT pt.products_type as "productsType", sum(p.count)::int as total from  products p
    inner join product_types pt ON  pt.id = p.product_type_id
    inner join  cases c on c.id = p.case_id 
    where c.register_date>= ${query.startDate} and c.register_date<= ${query.endDate}
    GROUP BY pt.products_type
    ORDER BY total DESC
    `;

    const totalProductsByType = productsByType.reduce((acc, item) => {
      return acc + item.total;
    }, 0);
    console.log(totalProductsByType);

    const documents = await this.prismaService.documentsCount
      .groupBy({
        by: ["category"],
        where: {
          case: {
            registerDate: {
              gte: query.startDate,
              lte: query.endDate,
            },
          },
        },
        _sum: { count: true },
      })
      .then((result) => {
        return result.map((item) => {
          return {
            category: item.category,
            count: item._sum.count,
          };
        });
      });

    const totalIdentifications =
      documents.find((item) => {
        return item.category === "identification";
      })?.count ?? 0;

    const totalDocuments = documents.reduce((acc, item) => {
      return acc + (item.count ?? 0);
    }, 0);

    const totalContractSum = await this.prismaService.case
      .aggregate({
        _sum: {
          contractSum: true,
        },
        where: {
          registerDate: {
            gte: query.startDate,
            lte: query.endDate,
          },
        },
      })
      .then((result) => {
        return result._sum.contractSum;
      });

    const refusesCase = await this.prismaService.case.findMany({
      where: {
        stateApplication: "REFUSED",
        registerDate: {
          gte: query.startDate,
          lte: query.endDate,
        },
      },
    });

    return {
      totalCases,
      productsByType,
      totalProductsByType,
      totalIdentifications,
      documents,
      totalDocuments,
      refusesCase,
      totalContractSum,
    };
  }
}
