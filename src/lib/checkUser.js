import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    // First, try to find the existing user
    const existingUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    // If user doesn't exist, create a new one
    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    const email = user.emailAddresses[0]?.emailAddress;
    const phone = user.phoneNumbers[0]?.phoneNumber || `N/A-${user.id}`;

    if (!email) {
      throw new Error("Email is required");
    }

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: name || "Unknown User",
        email,
        phone,
        userImageUrl: user.imageUrl,
        address: "Not provided", // Default value
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error);
    throw error;
  }
};
