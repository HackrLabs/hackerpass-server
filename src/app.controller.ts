import { Get, Controller } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  root(): Object {
    return {
      "active": true,
      "timestamp": new Date().getTime()
    };
  }
}
