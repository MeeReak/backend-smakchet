import { Controller, Get, Route } from "tsoa";

@Route("monolith-health")
export class MonolithController extends Controller {
  @Get("/")
  public async showHealth(): Promise<string> {
    return "OK";
  }
}
