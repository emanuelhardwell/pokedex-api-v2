import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';

@Injectable()
export class HandleError {
  constructor() {}

  handleErrorService(error: unknown) {
    console.log(error);

    if (error instanceof MongoServerError) {
      if (error.code) {
        const message = `MongoDB Error [Code: ${error.code}]:: ${error.message || 'errorMessage unavailable'}`;
        throw new BadRequestException(message);
      }
    }

    if (typeof error === 'string') throw new BadRequestException(error);

    if (error instanceof Error) throw error;

    throw new InternalServerErrorException(error);
  }
}
