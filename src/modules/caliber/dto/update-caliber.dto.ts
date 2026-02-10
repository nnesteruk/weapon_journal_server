import { PartialType } from "@nestjs/swagger";
import { CreateCaliberDto } from "./create-caliber.dto";

export class UpdateCaliberDto extends PartialType(CreateCaliberDto) {}
