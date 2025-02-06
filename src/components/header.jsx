import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  ChevronDown,
  File,
  PenTool,
  Clock,
  StarIcon,
  PawPrint,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
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
          <span className="text-white text-5xl font-semibold font-poppins">
            Lumo
          </span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-6">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline">
                <PawPrint className="h-4 w-4" />
                <span className="hidden md:block font-poppins">
                  Adopt a Pet
                </span>
              </Button>
            </Link>

            {/* My Pets Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <span className="hidden md:block font-poppins">My Pets</span>
                  <StarIcon className="h-5 w-5 ml-2" />
                  <ChevronDown className="h-5 w-5 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/adopted" className="flex items-center gap-2">
                    <File className="h-4 w-4" />
                    <span>My Adopted Pets</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/available" className="flex items-center gap-2">
                    <PenTool className="h-4 w-4" />
                    <span>Available for Adoption</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/history" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Adoption History</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>
        </div>

        {/* Profile Icon*/}
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
                userButtonPopoverCard: "shadow-xl",
                userPreviewMainIdentifier: "font-semibold",
              },
            }}
          />
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
