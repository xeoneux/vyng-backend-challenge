import { Test, TestingModule } from "@nestjs/testing";
import { config } from "dotenv";

import { AppController } from "./app.controller";

describe("AppController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    config();
    app = await Test.createTestingModule({
      controllers: [AppController]
    }).compile();
  });

  describe("Random YouTube Video", () => {
    it("should return a random YouTube video ID", async () => {
      const appController = app.get(AppController);
      expect(await appController.randomYouTubeVideo()).toHaveProperty("vid");
    });
  });
});
