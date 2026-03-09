// import { getTranslations } from "next-intl/server";

// import { eEnvironment } from "@/enums/environment";

// import {
//   NavigationMenu as ShadcnNavigationMenu,
//   NavigationMenuList,
//   NavigationMenuItem,
//   NavigationMenuTrigger,
//   NavigationMenuContent,
//   NavigationMenuLink,
// } from "@/components/shadcn/navigation-menu";

// import { Link } from "@/components/locals/blocks/links";

// type tLink = {
//   url: string;
//   label: string;
//   description: string;
// };

// export default async function NavigationMenu() {
//   const tNavigationMenu = await getTranslations("app.user.layout.header.navigation-menu");

//   const links: tLink[] = tNavigationMenu.raw("links");

//   return (
//     <ShadcnNavigationMenu className="z-20">
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>
//             {tNavigationMenu("label")}
//           </NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid grid-cols-2 gap-3 p-1 md:w-100 lg:w-125">
//               {links.map((link) => (
//                 <li key={link.url}>
//                   <NavigationMenuLink
//                     asChild={process.env.NODE_ENV === eEnvironment.development}
//                     // setting asChild to true in development works fine and nothing weird happens
//                     // in production the first link Hom doesn't appear doe to unknown issue
//                     // the only way to fix it so far is to set asChild to false in production and everything works fine
//                     // why only in production cuz in development it throws an error <a/> can't have a nested <a/> tag
//                   >
//                     <Link href={link.url}>
//                       <span className="leading-none font-medium">
//                         {link.label}
//                       </span>
//                       <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">
//                         {link.description}
//                       </p>
//                     </Link>
//                   </NavigationMenuLink>
//                 </li>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </ShadcnNavigationMenu>
//   );
// }
