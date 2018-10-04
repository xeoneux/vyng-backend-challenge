import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserGenerateDto } from "./dto/generate.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  public async makeNewUser(userGenerateDto: UserGenerateDto) {
    const user = await this.userRepository.create(userGenerateDto);
    return user.id;
  }
}
