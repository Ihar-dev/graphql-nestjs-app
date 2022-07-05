import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { LoginInputDTO } from './dto/login-input.dto';
import { RegisterInputDTO } from './dto/register-input.dto';
import { JwtDTO } from './dto/jwt.dto';
import { User } from './interfaces/user.interface';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class UsersService {
  private readonly client;
  private jwt = '';
  private readonly user: User;

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
    if (response?.data) this.jwt = response.data.jwt;
    return response?.data ? response.data : noServerResponseData;
  }

  public async register(
    registerInputDTO: RegisterInputDTO,
  ): Promise<RegisterDTO> {
    const noServerResponseData = {
      firstName: 'No Server Response',
      lastName: 'No Server Response',
      password: 'No Server Response',
      email: 'No Server Response',
      _id: 'No Server Response',
    };
    const response = await this.client
      .post('/register', registerInputDTO)
      .catch((res) =>
        console.log(`Response name: ${res.name}, message: ${res.message}`),
      );
    return response?.data ? response.data : noServerResponseData;
  }
}
