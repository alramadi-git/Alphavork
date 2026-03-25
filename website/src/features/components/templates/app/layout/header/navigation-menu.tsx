import { getTranslations } from "next-intl/server";

import { EnvironmentEnum } from "@/common/enums/environment.enum";

import {
  NavigationMenu as ShadcnNavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/features/components/ui/navigation-menu";

import { Link } from "@/features/components/blocks/links/link";
import { NavigationMenuGroupType } from "./types/navigation-menu-group.type";

export default async function NavigationMenu() {
  const tHeader = await getTranslations("app.layout.header");

  const navigationMenuGroups: NavigationMenuGroupType[] = tHeader.raw(
    "navigation-menu-groups",
  );

  return (
    <ShadcnNavigationMenu className="z-20">
      <NavigationMenuList>
        {navigationMenuGroups.map((navigationMenuGroup, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger>
              {navigationMenuGroup.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid grid-cols-2 gap-3 p-1 md:w-100 lg:w-125">
                {navigationMenuGroup.links.map((link, index) => (
                  <li key={index}>
                    <NavigationMenuLink
                      asChild={
                        process.env.NODE_ENV === EnvironmentEnum.Development
                      }
                      // setting asChild to true in development works fine and nothing weird happens
                      // in production the first link Hom doesn't appear doe to unknown issue
                      // the only way to fix it so far is to set asChild to false in production and everything works fine
                      // why only in production cuz in development it throws an error <a/> can't have a nested <a/> tag
                    >
                      <Link href={link.url}>
                        <span className="leading-none font-medium">
                          {link.label}
                        </span>
                        <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">
                          {link.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </ShadcnNavigationMenu>
  );
}
