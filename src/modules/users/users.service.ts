import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { LoginInputDTO } from './dto/login-input.dto';
import { RegisterInputDTO } from './dto/register-input.dto';
import { JwtDTO } from './dto/jwt.dto';
import { User } from './interfaces/user.interface';
import { RegisterResponseDTO } from './dto/register.dto';
import { RegisterResponseDataType } from './interfaces/register-response.interface';
import { RegisterChangedResponseDataType } from './interfaces/register-changed-response.interface';

const NO_SERVER_RESPONSE_VALUE = 'No Server Response';

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
    const noServerResponseData = { jwt: NO_SERVER_RESPONSE_VALUE };
    const response = await this.client
      .post('/login', loginInputDTO)
      .catch(res => this.consoleLog(res.name, res.message));
    if (response) this.jwt = response.data.jwt;
    return response ? response.data : noServerResponseData;
  }

  public async getUser(id: string): Promise<RegisterResponseDTO> {
    const noServerResponseData = this.getNoServerResponseData();
    const response = await this.client
      .get(`/${id}`)
      .catch(res => this.consoleLog(res.name, res.message));
    if (response) return this.getRegisterChangedResponseData(response.data);
    return noServerResponseData;
  }

  public async register(
    registerInputDTO: RegisterInputDTO,
  ): Promise<RegisterResponseDTO> {
    const noServerResponseData = this.getNoServerResponseData();
    const response = await this.client
      .post('/register', registerInputDTO)
      .catch(res => this.consoleLog(res.name, res.message));
    if (response) return this.getRegisterChangedResponseData(response.data);
    return noServerResponseData;
  }

  private getRegisterChangedResponseData(
    registerResponseData: RegisterResponseDataType,
  ): RegisterChangedResponseDataType {
    const registerChangedResponseData = this.getNoServerResponseData();
    registerChangedResponseData.id = registerResponseData._id;
    Object.entries(registerResponseData).forEach(([key, value]) => {
      if (key !== '_id') registerChangedResponseData[key] = value;
    });
    return registerChangedResponseData;
  }

  private getNoServerResponseData(): RegisterChangedResponseDataType {
    return {
      id: NO_SERVER_RESPONSE_VALUE,
      firstName: NO_SERVER_RESPONSE_VALUE,
      lastName: NO_SERVER_RESPONSE_VALUE,
      password: NO_SERVER_RESPONSE_VALUE,
      email: NO_SERVER_RESPONSE_VALUE,
    };
  }

  private consoleLog(name: string, message: string): void {
    console.log(`Response name: ${name}, message: ${message}`);
  }
}
