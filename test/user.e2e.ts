import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { config } from "dotenv";
import request from "supertest";

import { UserModule } from "../src/user/user.module";

describe("Cats", () => {
  let app: INestApplication;

  beforeAll(async () => {
    config();
    const module = await Test.createTestingModule({
      imports: [UserModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/POST users`, () => {
    return request(app.getHttpServer())
      .post("/users")
      .send({ name: "John Doe" })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
