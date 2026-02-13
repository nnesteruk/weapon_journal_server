import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class GetStatsQueryListDto {
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;
}
