import { ApiModelProperty } from "@nestjs/swagger";

export class VideoAddDto {
  @ApiModelProperty()
  public readonly url: string;
}
