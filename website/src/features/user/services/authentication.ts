"use client";

import useService from "@/services/use-service";

import {
  tRegisterCredentials,
  zRegisterCredentials,
} from "../validators/register-credentials";

import {
  tLoginCredentials,
  zLoginCredentials,
} from "@/validations/login-credentials";

import {
  tLoginByProviderCredentials,
  zLoginByProviderCredentials,
} from "@/validations/login-by-provider-credentials";

import { backendApi } from "@/features/axios/libraries/backend-api";

import { httpStatusCodeEnum } from "@/features/axios/enums/http-status-code-enum";

import { accountModel } from "@/features/axios/models/account-model";
import { tAccountModel as tUserAccountModel } from "@/features/user/models/account";

import {
  successServiceType,
  errorServiceType,
  ErrorService,
} from "@/services/service";

export default function useAuthenticationService() {
  const service = useService();

  async function register(
    credentials: tRegisterCredentials,
  ): Promise<
    successServiceType<accountModel<tUserAccountModel>> | errorServiceType
  > {
    return service.globalCatch(async () => {
      zRegisterCredentials.parse(credentials);

      const formData = new FormData();
      if (credentials.avatar) {
        formData.append("avatar", credentials.avatar);
      }

      formData.append("location.country", credentials.location.country);
      formData.append("location.city", credentials.location.city);
      formData.append("location.street", credentials.location.street);
      formData.append(
        "location.latitude",
        credentials.location.latitude.toString(),
      );
      formData.append(
        "location.longitude",
        credentials.location.longitude.toString(),
      );

      formData.append("username", credentials.username);

      formData.append(
        "birthday",
        credentials.birthday.toISOString().split("T")[0],
      );

      formData.append("phoneNumber", credentials.phoneNumber);

      formData.append("email", credentials.email);
      formData.append("password", credentials.password);

      formData.append("rememberMe", credentials.rememberMe.toString());

      const response = await backendApi.post(
        "/user/authentication/register",
        formData,
      );

      if (response.status !== httpStatusCodeEnum.created) {
        throw new ErrorService(response.status, response.data);
      }

      const result: accountModel<tUserAccountModel> = response.data;
      return {
        isSuccess: true,
        data: result,
      };
    });
  }

  async function login(
    credentials: tLoginCredentials,
  ): Promise<
    successServiceType<accountModel<tUserAccountModel>> | errorServiceType
  > {
    return service.globalCatch(async () => {
      zLoginCredentials.parse(credentials);

      const response = await backendApi.post(
        "/user/authentication/login",
        credentials,
      );

      if (response.status !== httpStatusCodeEnum.ok) {
        throw new ErrorService(response.status, response.data);
      }

      const result: accountModel<tUserAccountModel> = response.data;
      return {
        isSuccess: true,
        data: result,
      };
    });
  }

  async function loginWithProvider(
    credentials: tLoginByProviderCredentials,
  ): Promise<
    successServiceType<accountModel<tUserAccountModel>> | errorServiceType
  > {
    return service.globalCatch(async () => {
      zLoginByProviderCredentials.parse(credentials);

      const response = await backendApi.post(
        "/user/authentication/provider/me",
        credentials,
      );

      if (response.status !== httpStatusCodeEnum.ok) {
        throw new ErrorService(response.status, response.data);
      }

      const result: accountModel<tUserAccountModel> = response.data;
      return {
        isSuccess: true,
        data: result,
      };
    });
  }

  return {
    register,
    login,
    loginWithProvider,
  };
}
