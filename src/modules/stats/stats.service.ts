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
        products: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    console.log(cases);

    const totalProducts = cases.reduce(
      (total, caseItem) => caseItem._count.products + total,
      0,
    );

    return {
      totalCases: cases.length,
      totalProducts,
    };

    // return {
    //     totalCases:cases.length;
    // }
  }
}
