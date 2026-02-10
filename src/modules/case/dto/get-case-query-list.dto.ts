import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";
import { type CaseStateType } from "./case.type";

export class GetCaseQueryListDto {
  @IsOptional()
  @IsString()
  state?: CaseStateType;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateFrom?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dateTo?: Date;
}
