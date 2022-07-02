import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { LoginInputDTO } from './dto/login-input.dto';
import { JwtDTO } from './dto/jwt.dto';

@Injectable()
export class UsersService {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.USERS_URL,
    });
  }

  public async login(loginInputDTO: LoginInputDTO): Promise<JwtDTO> {
    const noServerResponseData = { jwt: 'No Server Response' };
    const response = await this.client
      .post('/login', loginInputDTO)
      .catch((res) =>
        console.log(`Response name: ${res.name}, message: ${res.message}`),
      );
    return response?.data ? response.data : noServerResponseData;
  }
}
