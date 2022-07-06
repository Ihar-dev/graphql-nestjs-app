import { Injectable } from '@nestjs/common';

import axios from 'axios';

const NO_SERVER_RESPONSE_VALUE = 'No Server Response';

@Injectable()
export class SharedService {
  private caughtErrorMessage = NO_SERVER_RESPONSE_VALUE;

  public async create<T, Q>(createInputDTO: Q, defaultData: T): Promise<T> {
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.JWT}`,
      },
    };
    const response = await axios
      .create({
        baseURL: process.env.GENRES_URL,
      })
      .post('', createInputDTO, config)
      .catch(err => this.setCaughtErrorMessage(err.name, err.message));
    if (response) response.data.id = response.data._id;
    return response ? response.data : this.getCaughtErrorData(defaultData);
  }

  private getCaughtErrorData<T>(defaultData: T): T {
    Object.keys(defaultData).forEach(
      key => (defaultData[key] = this.caughtErrorMessage),
    );
    return defaultData;
  }

  private setCaughtErrorMessage(name: string, message: string): void {
    this.caughtErrorMessage = `Response name: ${name}, message: ${message}`;
  }
}
