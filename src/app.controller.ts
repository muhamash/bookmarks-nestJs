import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private AppService: AppService) {}

  @Get()
  welcomeText() {
    return this.AppService.welcomeText();
  }
}
