import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  welcomeText() {
    return 'Server is running!!!!! Please navigate to baseUrl/api url to explore apis!!';
  }
}
