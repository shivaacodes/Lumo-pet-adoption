import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { checkUser } from "@/lib/checkUser";

const isProtectedRoute = createRouteMatcher([
  "/category(.*)",
  "/favourites(.*)",
  "/add-pet(.*)",
  "/requests(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId } = await auth();

    // If the user is not logged in and tries to access a protected route
    if (!userId && isProtectedRoute(req)) {
      const { redirectToSignIn } = await auth();
      return redirectToSignIn();
    }

    // Only proceed with database sync for authenticated users
    if (userId) {
      // Sync user data with our database
      const dbUser = await checkUser();
      
      // After successful sign-in, redirect to category page
      if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/sign-in") {
        return NextResponse.redirect(new URL("/category", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
