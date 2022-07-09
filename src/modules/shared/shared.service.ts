import { Injectable } from '@nestjs/common';
import axios from 'axios';

import { DeleteResponseDTO } from './dto/delete-response.dto';

const NO_SERVER_RESPONSE_VALUE = 'No Server Response';

@Injectable()
export class SharedService {
  private caughtErrorMessage = NO_SERVER_RESPONSE_VALUE;

  public async create<T, Q>(
    inputDTO: Q,
    defaultData: T,
    baseURL: string,
  ): Promise<T> {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    };
    const response = await axios
      .create({
        baseURL,
      })
      .post('', inputDTO, config)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    if (response) response.data.id = response.data._id;
    return response ? response.data : this.getCaughtErrorData(defaultData);
  }

  public async update<T, Q>(
    id: string,
    inputDTO: Q,
    defaultData: T,
    baseURL: string,
  ): Promise<T> {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    };
    const response = await axios
      .create({
        baseURL,
      })
      .put(`/${id}`, inputDTO, config)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    if (response) response.data.id = response.data._id;
    return response ? response.data : this.getCaughtErrorData(defaultData);
  }

  public async delete(id: string, baseURL: string): Promise<DeleteResponseDTO> {
    const defaultResponse: DeleteResponseDTO = {
      name: '',
      acknowledged: false,
      deletedCount: 0,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    };
    const response = await axios
      .create({
        baseURL,
      })
      .delete(`/${id}`, config)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    if (response) response.data.name = 'Response';
    return response ? response.data : this.getCaughtErrorData(defaultResponse);
  }

  public async getById<T>(
    id: string,
    defaultData: T,
    baseURL: string,
  ): Promise<T> {
    const response = await axios
      .create({
        baseURL,
      })
      .get(`/${id}`)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    if (response) response.data.id = response.data._id;
    return response ? response.data : this.getCaughtErrorData(defaultData);
  }

  public async getAll<T>(
    defaultData: T,
    baseURL: string,
    limit: number,
    offset: number,
  ): Promise<T[]> {
    const config = {
      params: {
        limit,
        offset,
      },
    };
    const response = await axios
      .create({
        baseURL,
      })
      .get('', config)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    if (response)
      response.data.items.forEach(element => (element.id = element._id));
    return response
      ? response.data.items
      : this.getCaughtErrorArray([defaultData]);
  }

  private getCaughtErrorArray<T>(defaultData: T): T {
    if (Array.isArray(defaultData))
      defaultData.map(element => this.getCaughtErrorData(element));
    return defaultData;
  }

  private getCaughtErrorData<T>(defaultData: T): T {
    Object.keys(defaultData).forEach(key => {
      if (typeof defaultData[key] === 'string')
        defaultData[key] = this.caughtErrorMessage;
    });
    return defaultData;
  }

  private setCaughtErrorMessage(name: string, message: string): void {
    this.caughtErrorMessage = `Response name: ${name}, message: ${message}`;
  }
}
