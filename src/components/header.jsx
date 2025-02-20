"use client";

import {
  SignInButton,
  UserButton,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

const Header = () => {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      toast.success("Successfully signed in!", {
        description: "Welcome back to Lumo!",
        duration: 3000,
      });
    }
  }, [isSignedIn, isLoaded]);

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-black text-5xl font-semibold font-poppins">
            Lumo
          </span>
        </Link>

        <SignedIn>
          <div className="flex items-center gap-6">
            <Link
              href="/category"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <Button variant="outline">Sign in</Button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
};

export default Header;
