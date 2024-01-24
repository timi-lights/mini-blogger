import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const derrors = {};
        errors.map((error: ValidationError) => {
          const message = Object.values(error.constraints);
          const label = error.property;
          derrors[label] = message[0];
        });

        next(new HttpException(400, 'Invalid input', derrors));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
