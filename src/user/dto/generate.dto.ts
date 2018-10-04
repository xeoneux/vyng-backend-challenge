import { ApiModelProperty } from "@nestjs/swagger";

export class UserGenerateDto {
  @ApiModelProperty()
  public readonly name: string;
}
