import { DocumentBuilder } from "@nestjs/swagger";

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle("Weapon Journal")
    .setDescription("Documentation REST API")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();
}
