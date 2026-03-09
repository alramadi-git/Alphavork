"use client";

import {
  useSetCookie,
  useGetCookie,
  useDeleteCookie,
} from "cookies-next/client";

import { useEffect, useState } from "react";

import useAccountService from "@/features/user/services/account";

import { errorTypeEnum } from "@/services/enums/error-type-enum";

import { accountModel } from "@/features/axios/models/account-model";
import { tAccountModel as tUserAccountModel } from "@/features/user/models/account";

import { tTokensModel } from "@/features/axios/models/tokens";

export default function useAccount() {
  const setCookie = useSetCookie();
  const getCookie = useGetCookie();
  const deleteCookie = useDeleteCookie();

  const [user, setUser] = useState<accountModel<tUserAccountModel>>();

  useEffect(() => {
    const account = getCookie("user-account");
    const accessToken = getCookie("user-access-token");
    const refreshToken = getCookie("user-refresh-token");
    const expiresAt = getCookie("user-expires-at");

    if (account && accessToken && refreshToken && expiresAt) {
      setUser({
        account: JSON.parse(account),
        refreshToken: refreshToken,
        accessToken: accessToken,
        expiresAt: new Date(expiresAt),
      });
    }
  }, [getCookie]);

  function onRefreshToken(tokens: tTokensModel): void {
    setCookie("user-access-token", tokens.accessToken, {
      secure: true,
      priority: "high",
      sameSite: "strict",
      expires: user!.expiresAt,
    });

    setCookie("user-refresh-token", tokens.refreshToken, {
      secure: true,
      priority: "high",
      sameSite: "strict",
      expires: user!.expiresAt,
    });

    setUser((prev) => {
      return {
        ...prev!,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    });
  }

  function onLogout(): void {
    deleteCookie("user-account");
    deleteCookie("user-access-token");
    deleteCookie("user-refresh-token");
    deleteCookie("user-expires-at");

    setUser(undefined);
  }

  const accountService = useAccountService();
  async function refreshTokens(): Promise<tTokensModel | null> {
    const response = await accountService.refreshTokens({
      uuid: user!.account.uuid,
      refreshToken: user!.refreshToken,
    });

    if (!response.isSuccess) {
      return null;
    }

    onRefreshToken(response.data);
    return response.data;
  }

  async function logout(): Promise<void> {
    const response = await accountService.logout(
      {
        refreshToken: user!.refreshToken,
      },
      user!.accessToken,
    );

    if (
      !response.isSuccess &&
      response.type === errorTypeEnum.unauthorized &&
      response.help === "Expired access token"
    ) {
      const tokens = await refreshTokens();
      if (tokens === null) {
        onLogout();
        return;
      }

      await accountService.logout(
        {
          refreshToken: tokens!.refreshToken,
        },
        tokens!.accessToken,
      );
    }

    onLogout();
  }

  if (user === undefined) return undefined;

  return {
    user,
    refreshTokens,
    logout,
  };
}
