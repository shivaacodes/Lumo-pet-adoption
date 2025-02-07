"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Heart,
  ClipboardList,
  ChevronRight,
  Grid,
  AppWindow,
} from "lucide-react"; // Importing new icons
import Link from "next/link";

const Sidebar = () => {
  const [active, setActive] = useState("categories");
  const [isOpen, setIsOpen] = useState(true); // Controls sidebar visibility

  const menuItems = [
    { id: "categories", label: "Categories", icon: Home, href: "/category" },
    { id: "favourites", label: "Favourites", icon: Heart, href: "/favourites" },
    {
      id: "adoptionRequests",
      label: "Adoption Requests",
      icon: ClipboardList,
      href: "/requests",
    },
  ];

  return (
    <aside
      className={cn(
        "min-h-screen bg-gray-100 p-4 border-r flex flex-col transition-all duration-300 rounded-3xl",
        isOpen ? "w-64" : "w-20",
        "shadow-xl shadow-blue-500/50" // Larger blue shadow
      )}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center mb-4">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full text-gray-700 hover:bg-gray-200 transition"
        >
          {isOpen ? (
            <ChevronRight className="w-6 h-6" />
          ) : (
            <ChevronRight className="w-6 h-6 transform rotate-180" />
          )}{" "}
          {/* Arrow icon */}
        </button>
      </div>

      {/* Lumo Text */}
      <div className="flex justify-center items-center mb-4">
        <span
          className={`text-lg font-semibold ${
            isOpen ? "text-gray-800" : "text-transparent"
          }`}
        >
          Lumo
        </span>
      </div>

      {/* Sidebar Content */}
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ease-in-out",
                active === item.id
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-50"
              )}
              onClick={() => setActive(item.id)}
            >
              <item.icon className="w-6 h-6 text-gray-700" />
              {isOpen && <span className="text-gray-800">{item.label}</span>}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
