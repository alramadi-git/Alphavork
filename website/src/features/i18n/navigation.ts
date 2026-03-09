import { routing } from "@/features/i18n/routing";
import { createNavigation } from "next-intl/navigation";

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const {
  redirect,
  permanentRedirect,
  getPathname,
  usePathname,
  useRouter,
  Link,
} = createNavigation(routing);
