import React from "react";
import Sidebar from "@/components/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 relative p-8">
        <SignedIn>
          <div className="absolute top-4 right-8">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-14 w-14",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />
          </div>
        </SignedIn>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
