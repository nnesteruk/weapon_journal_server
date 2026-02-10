import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

export const ApiCommonResponses = (entity?: string) => {
  const decorators: MethodDecorator[] = [
    ApiBearerAuth(),
    ApiBadRequestResponse({
      description: "Некорректный запрос",
      schema: {
        example: {
          statusCode: 400,
          message: "Некорректный запрос",
          error: "Bad Request",
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: "Пользователь не авторизован",
      schema: {
        example: {
          statusCode: 401,
          message: "Для работы нужен токен!",
          error: "Unauthorized",
        },
      },
    }),
  ];

  if (entity) {
    decorators.push(
      ApiBadRequestResponse({
        description: `${entity} не найден`,
        schema: {
          example: {
            statusCode: 404,
            message: `${entity} не найден`,
            error: "Not Found",
          },
        },
      }),
    );
  }

  return applyDecorators(...decorators);
};
