import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @HttpCode(400)
  getHello(): string {
    console.log("GET HELLO", process.env.NAME)
    return this.appService.getHello();
  }

  // get params route
  // @Get(":id")
  // getParams(@Param() params): string {
  //   console.log('params', params?.id);
  //   return `Params ==> #${params?.id}`
  // }
}
