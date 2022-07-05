import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { LoginInputDTO } from './dto/login-input.dto';
import { RegisterInputDTO } from './dto/register-input.dto';
import { JWT } from './dto/jwt.dto';
import { User } from './dto/register.dto';
import { RegisterResponseDataType } from './interfaces/register-response.interface';

const NO_SERVER_RESPONSE_VALUE = 'No Server Response';

@Injectable()
export class UsersService {
  private readonly client;
  private jwt = '';
  private user: User;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.USERS_URL,
    });
  }

  public async login(loginInputDTO: LoginInputDTO): Promise<JWT> {
    const noServerResponseData = { jwt: NO_SERVER_RESPONSE_VALUE };
    const response = await this.client
      .post('/login', loginInputDTO)
      .catch(res => this.consoleLogCaughtError(res.name, res.message));
    if (response) this.jwt = response.data.jwt;
    return response ? response.data : noServerResponseData;
  }

  public async getUser(id: string): Promise<User> {
    const noServerResponseData = this.getNoServerResponseData();
    const response = await this.client
      .get(`/${id}`)
      .catch(res => this.consoleLogCaughtError(res.name, res.message));
    if (response) return this.setUser(response.data);
    return noServerResponseData;
  }

  public async register(registerInputDTO: RegisterInputDTO): Promise<User> {
    const noServerResponseData = this.getNoServerResponseData();
    const response = await this.client
      .post('/register', registerInputDTO)
      .catch(res => this.consoleLogCaughtError(res.name, res.message));
    if (response) return this.setUser(response.data);
    return noServerResponseData;
  }

  private setUser(data: RegisterResponseDataType): User {
    this.user = this.getChangedResponseData(data);
    return this.user;
  }

  private getChangedResponseData(
    registerResponseData: RegisterResponseDataType,
  ): User {
    const registerChangedResponseData = this.getNoServerResponseData();
    registerChangedResponseData.id = registerResponseData._id;
    Object.entries(registerResponseData).forEach(([key, value]) => {
      if (key !== '_id') registerChangedResponseData[key] = value;
    });
    return registerChangedResponseData;
  }

  private getNoServerResponseData(): User {
    return {
      id: NO_SERVER_RESPONSE_VALUE,
      firstName: NO_SERVER_RESPONSE_VALUE,
      lastName: NO_SERVER_RESPONSE_VALUE,
      password: NO_SERVER_RESPONSE_VALUE,
      email: NO_SERVER_RESPONSE_VALUE,
    };
  }

  private consoleLogCaughtError(name: string, message: string): void {
    console.log(`Response name: ${name}, message: ${message}`);
  }
}
