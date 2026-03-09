import { AbstractService } from "@/services/service";

import {
  tNewsletterCredentials,
  zNewsletterCredentials,
} from "../validators/newsletter-credentials";

import { backendApi } from "@/features/axios/libraries/backend-api";

import { httpStatusCodeEnum } from "@/features/axios/enums/http-status-code-enum";

import {
  successServiceType,
  errorServiceType,
  ErrorService,
} from "@/services/service";

class NewsletterSubscriptionService extends AbstractService {
  public async subscribe(
    credentials: tNewsletterCredentials,
  ): Promise<successServiceType<null> | errorServiceType> {
    return await this.globalCatch(async () => {
      await zNewsletterCredentials.parseAsync(credentials);

      const response = await backendApi.post(
        "/newsletter/subscribe",
        credentials,
      );
      if (response.status !== httpStatusCodeEnum.created) {
        throw new ErrorService(response.status, response.data);
      }

      return {
        isSuccess: true,
        data: null,
      };
    });
  }
}

export { NewsletterSubscriptionService };
