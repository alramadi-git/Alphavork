// import { getTranslations } from "next-intl/server";

// import { LuMenu, LuX } from "react-icons/lu";

// import { Container } from "@/features/components/locals/blocks/typography";

// import Languages from "../../../blocks/languages";
// import Account from "./account";

// import {
//   Sheet,
//   SheetTrigger,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
//   SheetClose,
// } from "@/features/components/shadcn/sheet";

// import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// import { Button } from "@/features/components/shadcn/button";
// import { Link } from "@/features/components/locals/blocks/links";

// type tLink = {
//   url: string;
//   label: string;
// };

// export default async function MobileNavigationMenu() {
//   const tSettings = await getTranslations("settings");
//   const tMobileNavigationMenu = await getTranslations(
//     "app.user.layout.header.mobile-navigation-menu",
//   );

//   const links: tLink[] = tMobileNavigationMenu.raw("links");

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="ghost" className="md:hidden">
//           <LuMenu className="size-8" />
//         </Button>
//       </SheetTrigger>
//       <SheetContent
//         side={tSettings("direction") === "ltr" ? "left" : "right"}
//         className="w-full"
//       >
//         <Container className="flex h-full flex-col gap-4 p-4">
//           <SheetHeader className="flex flex-row flex-wrap gap-2 p-0">
//             <VisuallyHidden>
//               <SheetTitle>{tMobileNavigationMenu("label")}</SheetTitle>
//               <SheetDescription>
//                 {tMobileNavigationMenu("description")}
//               </SheetDescription>
//             </VisuallyHidden>
//             <SheetClose asChild>
//               <Button variant="outline" className="w-fit">
//                 <LuX />
//               </Button>
//             </SheetClose>
//             <Languages align="end" className="grow" />
//             <Account />
//           </SheetHeader>
//           <ul className="space-y-2">
//             {links.map((link) => (
//               <li key={link.url}>
//                 <SheetClose asChild>
//                   <Link
//                     href={link.url}
//                     className="inline-block text-xl duration-150 hover:indent-1 hover:underline"
//                   >
//                     {link.label}
//                   </Link>
//                 </SheetClose>
//               </li>
//             ))}
//           </ul>
//         </Container>
//       </SheetContent>
//     </Sheet>
//   );
// }
