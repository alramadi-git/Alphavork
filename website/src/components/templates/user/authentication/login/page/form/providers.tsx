import {
  IconBrandGoogleFilled,
  IconBrandMeta,
  IconBrandAppleFilled,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/blocks/links";

const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;
const RETURN_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/authentication/provider/me`;

export default function Providers() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <Button asChild variant="outline">
        <Link
          href={`${BACKEND_API}/authentication/login/provider/google?ReturnUrl=${RETURN_URL}`}
        >
          <IconBrandGoogleFilled className="size-4" />
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link
          href={`${BACKEND_API}/authentication/login/provider/meta?ReturnUrl=${RETURN_URL}`}
        >
          <IconBrandMeta className="size-4" />
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link
          href={`${BACKEND_API}/authentication/login/provider/apple?ReturnUrl=${RETURN_URL}`}
        >
          <IconBrandAppleFilled className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
