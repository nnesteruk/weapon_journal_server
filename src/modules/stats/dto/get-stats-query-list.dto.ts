import { Type } from "class-transformer";
import { IsArray, IsDate } from "class-validator";

export class GetStatsQueryListDto {
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsArray()
  weaponType: string[];
}
