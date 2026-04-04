import { getTranslations } from "next-intl/server";

import { NavigationMenuGroupType } from "./types/navigation-menu-group.type";

import {
  NavigationMenu as ShadcnNavigationMenu,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/features/components/ui/navigation-menu";

import { Link } from "@/features/components/blocks/links/link/link";

export default async function NavigationMenu() {
  const tHeader = await getTranslations("app.layout.header");

  const navigationMenuGroups: NavigationMenuGroupType[] = tHeader.raw(
    "navigation-menu-groups",
  );

  return (
    <ShadcnNavigationMenu className="z-20">
      <NavigationMenuList>
        {navigationMenuGroups.map((navigationMenuGroup, index) => {
          if (!("links" in navigationMenuGroup)) {
            return (
              <NavigationMenuItem key={index}>
                <Link href={navigationMenuGroup.url}>
                  <NavigationMenuLink asChild>
                    <div className="px-4 font-medium">
                      {navigationMenuGroup.label}
                    </div>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={index}>
              <NavigationMenuTrigger>
                {navigationMenuGroup.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-2 gap-3 md:w-100 lg:w-125">
                  {navigationMenuGroup.links.map((link) => (
                    <li key={link.url}>
                      <Link href={link.url}>
                        <NavigationMenuLink asChild>
                          <div>
                            <span className="leading-none font-medium">
                              {link.label}
                            </span>
                            <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">
                              {link.description}
                            </p>
                          </div>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </ShadcnNavigationMenu>
  );
}
