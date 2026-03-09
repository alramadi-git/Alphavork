"use client";

import { useSetCookie } from "cookies-next/client";

import useAuthenticationService from "@/features/user/services/authentication";

import { tRegisterCredentials } from "@/features/user/validators/register-credentials";

import { tLoginCredentials } from "@/validations/login-credentials";

import { tLoginByProviderCredentials } from "@/validations/login-by-provider-credentials";

import { accountModel } from "@/features/axios/models/account-model";
import { tAccountModel as tUserAccountModel } from "@/features/user/models/account";

export default function useAuthentication() {
  const setCookie = useSetCookie();

  function onLogin(account: accountModel<tUserAccountModel>): void {
    setCookie("user-account", JSON.stringify(account.account), {
      secure: true,
      priority: "high",
      sameSite: "strict",
      expires: account.expiresAt,
    });

    setCookie("user-access-token", account.accessToken, {
      secure: true,
      priority: "high",
      sameSite: "strict",
      expires: account.expiresAt,
    });

    setCookie("user-refresh-token", account.refreshToken, {
      secure: true,
      priority: "high",
      sameSite: "strict",
      expires: account.expiresAt,
    });

    setCookie("user-expires-at", account.expiresAt, {
      secure: true,
      priority: "high",
      sameSite: "strict",
      expires: account.expiresAt,
    });
  }

  const authenticationService = useAuthenticationService();

  async function register(credentials: tRegisterCredentials): Promise<boolean> {
    const response = await authenticationService.register(credentials);
    if (!response.isSuccess) {
      return false;
    }

    onLogin(response.data);
    return true;
  }

  async function login(credentials: tLoginCredentials): Promise<boolean> {
    const response = await authenticationService.login(credentials);
    if (!response.isSuccess) {
      return false;
    }

    onLogin(response.data);
    return true;
  }

  async function loginWithProvider(
    credentials: tLoginByProviderCredentials,
  ): Promise<boolean> {
    const response = await authenticationService.loginWithProvider(credentials);
    if (!response.isSuccess) {
      return false;
    }

    onLogin(response.data);
    return true;
  }

  return {
    register,
    login,
    loginWithProvider,
  };
}
