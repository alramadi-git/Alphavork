import { ErrorTypeEnum } from "./enums/error-type.enum";

import { ZodError } from "zod";
import { AxiosError } from "axios";

type successServiceType<tData> = {
  isSuccess: true;
  data: tData;
};

type errorServiceType = {
  isSuccess: false;
  type: ErrorTypeEnum;
  help: string;
};

class ErrorService extends Error {
  public type: ErrorTypeEnum;

  public constructor(type: ErrorTypeEnum, help: string) {
    super(help);
    this.type = type;
  }
}

abstract class AbstractService {
  protected async globalCatch<tData>(
    callback: () => Promise<successServiceType<tData>>,
  ): Promise<successServiceType<tData> | errorServiceType> {
    try {
      return await callback();
    } catch (error: unknown) {
      if (error instanceof ErrorService) {
        return {
          isSuccess: false,
          type: error.type,
          help: error.message,
        };
      }

      if (error instanceof ZodError) {
        return {
          isSuccess: false,
          type: ErrorTypeEnum.validationError,
          help: "Validation error. Please check your input and try again.",
        };
      }

      if (error instanceof AxiosError) {
        return {
          isSuccess: false,
          type: ErrorTypeEnum.networkError,
          help: "A network error occurred. Please try again later.",
        };
      }

      return {
        isSuccess: false,
        type: ErrorTypeEnum.unknownError,
        help: "An unknown error occurred. Please try again later.",
      };
    }
  }
}

export type { successServiceType, errorServiceType };

export { ErrorService, AbstractService };
