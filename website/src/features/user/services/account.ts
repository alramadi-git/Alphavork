"use client";

import useService from "@/services/use-service";

import {
  tRefreshTokensCredentials,
  zRefreshTokensCredentials,
} from "@/validations/refresh-tokens-credentials";

import {
  tLogoutCredentials,
  zLogoutCredentials,
} from "@/validations/logout-credentials";

import { backendApi } from "@/features/axios/libraries/backend-api";

import { httpStatusCodeEnum } from "@/features/axios/enums/http-status-code-enum";

import { tTokensModel } from "@/features/axios/models/tokens";

import {
  successServiceType,
  errorServiceType,
  ErrorService,
} from "@/services/service";

export default function useAccountService() {
  const service = useService();

  async function refreshTokens(
    credentials: tRefreshTokensCredentials,
  ): Promise<successServiceType<tTokensModel> | errorServiceType> {
    return service.globalCatch(async () => {
      zRefreshTokensCredentials.parse(credentials);

      const response = await backendApi.post(
        "/user/account/refresh-tokens",
        credentials,
      );

      if (response.status !== httpStatusCodeEnum.ok) {
        throw new ErrorService(response.status, response.data);
      }

      const result: tTokensModel = response.data;
      return {
        isSuccess: true,
        data: result,
      };
    });
  }

  async function logout(
    credentials: tLogoutCredentials,
    accessToken: string,
  ): Promise<successServiceType<null> | errorServiceType> {
    return service.globalCatch(async () => {
      zLogoutCredentials.parse(credentials);

      const response = await backendApi.post(
        "/user/account/logout",
        credentials,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
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
    refreshTokens,
    logout,
  };
}
