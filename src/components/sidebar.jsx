"use client";

import React, { useState } from "react";
import {
  Home,
  Heart,
  ClipboardList,
  ChevronRight,
  Plus,
  Settings,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [active, setActive] = useState("categories");
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: "categories", label: "Categories", icon: Home, href: "/category" },
    { id: "addPet", label: "Add a Pet", icon: Plus, href: "/add-pet" },
    {
      id: "adoptionRequests",
      label: "Adoption Requests",
      icon: ClipboardList,
      href: "/requests",
    },
    { id: "favourites", label: "Favourites", icon: Heart, href: "/favourites" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside
      className={`min-h-screen bg-gray-100 p-4 border-r flex flex-col transition-all duration-300 rounded-3xl shadow-xl shadow-blue-500/50 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-gray-700 hover:bg-gray-200 transition self-end"
      >
        <ChevronRight
          className={`w-6 h-6 transform ${!isOpen && "rotate-180"}`}
        />
      </button>

      {/* Lumo Text */}
      {isOpen && (
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-6">
          Lumo
        </h2>
      )}

      {/* Sidebar Menu */}
      <nav className="flex flex-col space-y-6">
        {menuItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <div
              className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition ${
                active === item.id
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setActive(item.id)}
            >
              <item.icon className="w-6 h-6 text-gray-700" />
              {isOpen && (
                <span className="text-sm text-gray-800">{item.label}</span>
              )}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
