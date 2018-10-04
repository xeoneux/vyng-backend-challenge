import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app/app.module";

(async () => {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("Vyng Backend Challenge")
    .setDescription("Vyng Backend Challenge API")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  await app.listen(1234);
})();
