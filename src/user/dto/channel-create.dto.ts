import { ApiModelProperty } from "@nestjs/swagger";

export class ChannelCreateDto {
  @ApiModelProperty()
  public readonly name: string;
}
