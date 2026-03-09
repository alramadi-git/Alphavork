type accountModel<tAccount> = {
  account: tAccount;
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
};

export type { accountModel };
