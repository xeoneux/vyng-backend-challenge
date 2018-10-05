import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "dotenv";
import { resolve } from "path";

import { AppModule } from "./app/app.module";

config();

(async () => {
  const port = process.env.PORT || 5678;
  const app = await NestFactory.create(AppModule);
  app.useStaticAssets(resolve(__dirname, "../build"));

  const options = new DocumentBuilder()
    .setTitle("Vyng Backend Challenge")
    .setDescription("Vyng Backend Challenge API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  await app.listen(port);
})();
