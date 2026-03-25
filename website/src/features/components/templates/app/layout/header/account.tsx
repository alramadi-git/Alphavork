// "use client";

// import { useTranslations } from "next-intl";

// import useAccount from "@/user/hooks/account";

// import { LuLogOut, LuUserRound } from "react-icons/lu";

// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
// } from "@/features/components/shadcn/dropdown-menu";

// import {
//   Avatar,
//   AvatarImage,
//   AvatarFallback,
// } from "@/features/components/shadcn/avatar";

// import { Button } from "@/features/components/shadcn/button";
// import { Link } from "@/features/components/locals/blocks/links";

// export default function Account() {
//   const { account, logout } = useAccount();

//   const tAccount = useTranslations("app.user.layout.header.account");

//   if (account === null) {
//     return (
//       <Button asChild className="max-md:grow">
//         <Link href="/authentication/login">
//           {tAccount("when-unauthenticated.login")}
//         </Link>
//       </Button>
//     );
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" className="border p-2.5 hover:bg-transparent">
//           <Avatar className="size-6 items-center justify-center rounded">
//             <AvatarImage
//               src={account.avatar?.url}
//               alt={account.username}
//               className="rounded bg-transparent"
//             />
//             <AvatarFallback className="rounded bg-transparent">
//               <LuUserRound className="opacity-60" aria-hidden="true" />
//             </AvatarFallback>
//           </Avatar>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="max-w-64">
//         <div>
//           <p className="text-foreground text-sm font-medium">
//             {account.username}
//           </p>
//           <p className="text-muted-foreground truncate text-xs font-normal">
//             {account.email}
//           </p>
//         </div>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem asChild variant="destructive" onClick={logout}>
//           <button className="w-full">
//             <LuLogOut className="size-4" />
//             {tAccount("when-authenticated.logout")}
//           </button>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
