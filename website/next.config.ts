import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/alramadi/alphavork/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./src/features/i18n/request.ts");
export default withNextIntl(nextConfig);
