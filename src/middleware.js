import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const publicPaths = [
  "/",
  "/sign-in*",
  "/sign-up*",
  "/api/pets/by-category*",
  "/category*",
];

const isPublic = (path) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x.replace("*", ".*")}$`))
  );
};

export default clerkMiddleware((auth, req) => {
  const path = req.nextUrl.pathname;

  // Allow public routes
  if (isPublic(path)) {
    return NextResponse.next();
  }

  // Continue with default clerk middleware behavior
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
