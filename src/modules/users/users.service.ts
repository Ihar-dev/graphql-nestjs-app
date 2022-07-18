import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { LoginInputDTO } from './dto/login-input.dto';
import { RegisterInputDTO } from './dto/register-input.dto';
import { JWT } from './dto/jwt.dto';
import { User } from './dto/user.dto';
import { RegisterResponseDataType } from './interfaces/register-response.interface';

const NO_SERVER_RESPONSE_VALUE = 'No Server Response';

@Injectable()
export class UsersService {
  private readonly client;
  private user: User;
  private caughtErrorMessage = NO_SERVER_RESPONSE_VALUE;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.USERS_URL,
    });
  }

  public async login(loginInputDTO: LoginInputDTO): Promise<JWT> {
    const response = await this.client
      .post('/login', loginInputDTO)
      .catch(res => this.setCaughtErrorMessage(res.name, res.message));
    if (response) process.env.JWT = response.data.jwt;
    return response ? response.data : { jwt: this.caughtErrorMessage };
  }

  public async getUser(id: string): Promise<User> {
    const response = await this.client
      .get(`/${id}`)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    return response ? this.setUser(response.data) : this.getCaughtErrorUser();
  }

  public async register(registerInputDTO: RegisterInputDTO): Promise<User> {
    const response = await this.client
      .post('/register', registerInputDTO)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    return response ? this.setUser(response.data) : this.getCaughtErrorUser();
  }

  private getCaughtErrorUser(): User {
    return {
      id: this.caughtErrorMessage,
      firstName: this.caughtErrorMessage,
      lastName: this.caughtErrorMessage,
      password: this.caughtErrorMessage,
      email: this.caughtErrorMessage,
    };
  }

  private setUser(data: RegisterResponseDataType): User {
    this.user = this.getChangedResponseData(data);
    return this.user;
  }

  private getChangedResponseData(
    registerResponseData: RegisterResponseDataType,
  ): User {
    const registerChangedResponseData = this.getDefaultUser();
    registerChangedResponseData.id = registerResponseData._id;
    Object.entries(registerResponseData).forEach(([key, value]) => {
      if (key !== '_id') registerChangedResponseData[key] = value;
    });
    return registerChangedResponseData;
  }

  private getDefaultUser(): User {
    return {
      id: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
    };
  }

  private setCaughtErrorMessage(name: string, message: string): void {
    this.caughtErrorMessage = `Response name: ${name}, message: ${message}`;
  }
}
