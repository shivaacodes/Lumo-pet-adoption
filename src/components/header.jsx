import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Header = async () => {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/lumo.png"
            alt="Lumo Logo"
            width={220}
            height={70}
            className="h-14 w-auto object-contain"
          />
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
