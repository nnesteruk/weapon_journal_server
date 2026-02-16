import { PrismaService } from "@modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { GetStatsQueryListDto } from "./dto/get-stats-query-list.dto";

@Injectable()
export class StatsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getStats(query: GetStatsQueryListDto) {
    const cases = await this.prismaService.case.findMany({
      where: {
        registerDate: {
          gte: query.startDate,
          lte: query.endDate,
        },
      },
      include: {
        documentsCount: true,
        products: {
          include: { productType: true },
        },
        // _count: {
        //   select: {
        //     products: {},
        //   },
        // },
        _count: {
          select: {
            products: {
              where: {},
            },
          },
        },
      },
    });
    console.log("cases", cases);

    // const product = await this.prismaService.product.groupBy({
    //   by: ["productTypeId"],
    //   _sum: { count: true },
    // });

    const documents = await this.prismaService.documentsCount.groupBy({
      by: ["category"],
      _sum: { count: true },
    });

    const totalIdentification =
      documents.find((item) => item.category === "identification")?._sum
        .count || 0;

    const products = cases
      .map((caseItem) => caseItem.products)
      .flat()
      .reduce(
        (obj, product) => {
          obj[product.productType.productType] =
            (obj[product.productType.productType] || 0) + 1;
          return obj;
        },
        {} as Record<string, number>,
      );

    // const documents = cases
    //   .map((caseItem) => caseItem.documentsCount)
    //   .flat()
    //   .reduce(
    //     (obj, item) => {
    //       obj[item.category] = (obj[item.category] || 0) + item.count;
    //       return obj;
    //     },
    //     {} as Record<DocumentsCategoryKey, number | undefined>,
    //   );

    const refusesCase = cases.filter(
      (item) => item.stateApplication === "REFUSED",
    );

    const kpi = cases.reduce(
      (obj, caseItem) => {
        // obj.totalProducts += caseItem._count.products;
        obj.totalSum = obj.totalSum + (caseItem.contractSum || 0);
        return obj;
      },
      {
        totalSum: 0,
        totalProducts: 0,
        refusal: 0,
      },
    );

    return {
      ...kpi,
      totalCases: cases.length,
      totalIdentification,
      documents,
      products,
      refusesCase,
    };
  }
}
