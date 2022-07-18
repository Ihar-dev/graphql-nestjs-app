import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Use http://localhost:5000/graphql, please!';
  }
}
