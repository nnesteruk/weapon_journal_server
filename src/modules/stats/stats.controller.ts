import { Roles } from "@common/decorators";
import { ApiCommonResponses } from "@common/decorators/api-common-responses.decorator";
import { AuthGuard, RolesGuard } from "@common/guards";
import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { ResponseStatsDto } from "./dto/create-stats.dto";
import { GetStatsQueryListDto } from "./dto/get-stats-query-list.dto";
import { StatsService } from "./stats.service";

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller("stats")
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @ApiOkResponse({
    description: "Статистика",
    type: [ResponseStatsDto],
  })
  @ApiOperation({
    summary: "Получение списка дел",
    description: "Получает список дел",
  })
  @ApiCommonResponses()
  @Get()
  async getStats(@Query() query: GetStatsQueryListDto) {
    return await this.statsService.getStats(query);
  }
}
