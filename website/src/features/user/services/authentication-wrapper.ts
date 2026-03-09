"use client";

import useService from "@/services/use-service";
import useAccount from "../hooks/account";

import { errorTypeEnum } from "@/services/enums/error-type-enum";

import {
  successServiceType,
  tPaginatedService,
  errorServiceType,
} from "@/services/service";

export default function useAuthenticationWrapperService() {
  const service = useService();
  const account = useAccount();

  async function wrapper<gtData>(
    callback: (token: string) => Promise<successServiceType<gtData>>,
  ): Promise<successServiceType<gtData> | errorServiceType>;
  async function wrapper<gtData>(
    callback: (token: string) => Promise<tPaginatedService<gtData>>,
  ): Promise<tPaginatedService<gtData> | errorServiceType>;
  async function wrapper<gtData>(
    callback: (
      token: string,
    ) => Promise<successServiceType<gtData> | tPaginatedService<gtData>>,
  ): Promise<
    successServiceType<gtData> | tPaginatedService<gtData> | errorServiceType
  > {
    const response = await service.globalCatch(
      async () => await callback(account!.user.accessToken),
    );

    if (!response.isSuccess && response.type === errorTypeEnum.unauthorized) {
      if (response.help !== "Expired access token") {
        return response;
      }

      const accessToken = await account!.refreshTokens();
      if (accessToken === null) {
        return response;
      }

      return await service.globalCatch(
        async () => await callback(accessToken.accessToken),
      );
    }

    return response;
  }

  if (account === undefined) {
    return undefined;
  }

  return {
    wrapper,
  };
}
