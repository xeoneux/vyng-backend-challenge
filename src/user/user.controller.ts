import { Body, Controller, Post } from "@nestjs/common";

import { UserGenerateDto } from "./dto/generate.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async generate(@Body() userGenerateDto: UserGenerateDto) {
    return this.userService.makeNewUser(userGenerateDto);
  }
}
