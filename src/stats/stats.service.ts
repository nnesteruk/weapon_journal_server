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
    });

    console.log(cases);

    return {
      cases,
    };

    // return {
    //     totalCases:cases.length;
    // }
  }
}
