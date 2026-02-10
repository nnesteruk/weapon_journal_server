import { getJwtConfig } from "@config/jwt.config";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ApplicantController } from "./applicant.controller";
import { ApplicantService } from "./applicant.service";
import { AuthGuard, RolesGuard } from "@common/guards";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [ApplicantController],
  providers: [ApplicantService, AuthGuard, RolesGuard],
})
export class ApplicantModule {}
