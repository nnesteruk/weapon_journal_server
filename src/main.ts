import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { setupSwagger } from "./utils/swagger.util";

async function start() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix("api");

  app.set("query parser", "extended");

  const config = app.get(ConfigService);

  app.enableCors({
    origin: config.getOrThrow<string>("ALLOWED_ORIGINS"),
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
