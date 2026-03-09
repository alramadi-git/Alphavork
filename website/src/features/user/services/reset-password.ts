"use client";

import useService from "@/services/use-service";

import {
  tValidateEmailCredentials,
  zValidateEmailCredentials,
} from "@/validations/validate-email-credentials";

import { backendApi } from "@/features/axios/libraries/backend-api";

import { httpStatusCodeEnum } from "@/features/axios/enums/http-status-code-enum";

import { accountModel } from "@/features/axios/models/account-model";
import { tAccountModel as tUserAccountModel } from "@/features/user/models/account";

import {
  successServiceType,
  errorServiceType,
  ErrorService,
} from "@/services/service";

export default function useResetPasswordService() {
  const service = useService();

  async function verifyEmail(
    credentials: tValidateEmailCredentials,
  ): Promise<successServiceType<null> | errorServiceType> {
    return service.globalCatch(async () => {
      zValidateEmailCredentials.parse(credentials);

      const response = await backendApi.post(
        "/user/authentication/reset-password/verify-email",
        credentials,
      );

      if (response.status !== httpStatusCodeEnum.noContent) {
        throw new ErrorService(response.status, response.data);
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }

  async function verifyOtp(
    credentials: tValidateEmailCredentials,
  ): Promise<successServiceType<null> | errorServiceType> {
    return service.globalCatch(async () => {
      zValidateEmailCredentials.parse(credentials);

      const response = await backendApi.post(
        "/user/authentication/reset-password/verify-otp",
        credentials,
      );

      if (response.status !== httpStatusCodeEnum.noContent) {
        throw new ErrorService(response.status, response.data);
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }

  return {
    verifyEmail,
  };
}
