import { Controller, Get } from "@nestjs/common";
import Axios from "axios";

@Controller()
export class AppController {
  @Get("random")
  public async randomYouTubeVideo() {
    const result = await Axios.get(
      `https://randomyoutube.net/api/getvid?api_token=${
        process.env.RANDOMYOUTUBE_TOKEN
      }`
    );
    return result.data;
  }
}
