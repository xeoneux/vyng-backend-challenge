import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app/app.module";

(async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
})();
