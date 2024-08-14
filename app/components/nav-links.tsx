"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuthUser from "../hooks/use-auth-user";


const links = [
  { name: "Home", href: "/dashboard" },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
  },
  { name: "Customers", href: "/dashboard/customers"},
  { name: "events", href: "/dashboard/events"}
];




export default function NavLinks() {

  const user = useAuthUser();
    

const pathname = usePathname();

  if(user?.isAdmin){
      links.push({
          name: "Admin Area",
          href: "/dashboard/admins"
      })
  }

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}