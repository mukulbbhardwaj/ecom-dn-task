"use client";

import cookie from "cookie";
import Link from "next/link";
import { navItems } from "~/constants";
import { type UserProps } from "~/types";
import LogoutButton from "./logoutButton";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const userDataCookie: UserProps = JSON.parse(cookies?.userData ?? "{}");
    setUser(Object.keys(userDataCookie).length > 0 ? userDataCookie : null);
  }, [pathname]);

  return (
    <nav className="p-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-end space-x-3 text-sm">
        <p className="hidden md:flex">Help</p>
        <p className="hidden md:flex">Orders & Returns</p>
        <p className="font-medium">{user? `Hi,${user?.name}`:"" }
        </p>
        {user && <LogoutButton />}
      </div>
      {/* Main Navigation */}
      <div className="mt-4 flex items-baseline justify-between">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold">ECOMMERCE</h1>
        </Link>
        <div className="hidden space-x-6 text-[16px] font-semibold md:flex">
          {navItems.map((item, index) => (
            <p className="cursor-pointer" key={index}>
              {item.label}
            </p>
          ))}
        </div>
        <div className="flex items-baseline space-x-9">
          <Search className="w-5 cursor-pointer" />
          <ShoppingCart className="w-5 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
