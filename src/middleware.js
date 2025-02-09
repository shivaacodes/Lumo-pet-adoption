import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/category(.*)",
  "/favourites(.*)",
  "/add-pet(.*)",
  "/requests(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If the user is not logged in and tries to access a protected route
  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  // After successful sign-in, redirect the user to /category/[userId]
  if (userId && req.nextUrl.pathname === "/sign-in") {
    const userResponse = await fetch(`${req.nextUrl.origin}/api/user`);
    const userData = await userResponse.json();

    if (userData?.id) {
      return NextResponse.redirect(
        new URL(`/category/${userData.id}`, req.url)
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
