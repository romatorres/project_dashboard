"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  LayoutDashboard,
  Layers,
  Settings,
  FolderOpen,
  Mail,
  Menu,
  X,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    {
      href: "/dashboard",
      label: "Home",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      href: "/dashboard/Services",
      label: "Services",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      href: "/dashboard/Projects",
      label: "Projects",
      icon: <FolderOpen className="w-5 h-5" />,
    },
    {
      href: "/dashboard/Contacts",
      label: "Contacts",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      href: "/dashboard/Sections",
      label: "Sections",
      icon: <Layers className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* User Profile at Top */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-600">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="User avatar"
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="flex items-center justify-center h-full text-lg">
                  {session?.user?.name?.[0] || session?.user?.email?.[0]}
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium truncate">
                {session?.user?.name || session?.user?.email}
              </p>
              <p className="text-sm text-gray-400">Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-6">
          <nav>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 p-2 rounded hover:bg-gray-800 ${
                      pathname === item.href ? "bg-gray-800" : ""
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-2 text-gray-400 hover:text-white w-full p-2 rounded hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </>
  );
}
