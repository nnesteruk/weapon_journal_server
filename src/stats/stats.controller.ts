import { Roles } from "@common/decorators";
import { AuthGuard, RolesGuard } from "@common/guards";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { GetStatsQueryListDto } from "./dto/get-stats-query-list.dto";
import { StatsService } from "./stats.service";

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getStats(@Query() query: GetStatsQueryListDto) {
    return await this.statsService.getStats(query); //this;
  }
}
