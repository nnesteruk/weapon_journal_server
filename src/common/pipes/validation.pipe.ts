import { ValidationException } from "@common/exceptions/validation.exception";
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const obj = plainToInstance(metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints || {}).join(", ")}`;
      });

      throw new ValidationException(messages);
    }

    return value;
  }

  private toValidate(metatype: new (...args: any[]) => any): boolean {
    const types: (new (...args: any[]) => any)[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype);
  }
}
