import { AuthGuard } from "@common/guards/auth.guard";
import { RolesGuard } from "@common/guards/roles.guard";
import { getJwtConfig } from "@config/jwt.config";
import { FileModule } from "@modules/file";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { CaseController } from "./case.controller";
import { CaseService } from "./case.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
    FileModule,
  ],
  controllers: [CaseController],
  providers: [CaseService, AuthGuard, RolesGuard],
})
export class CaseModule {}
