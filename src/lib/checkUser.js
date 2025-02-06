import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });
    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    const phone = user.phone || `N/A-${user.id}`;
    const address = user.address || "Unknown Address";

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: name.length > 1 ? name : "Unknown User",
        userImageUrl: user.userImageUrl,
        email: user.emailAddresses[0].emailAddress,
        phone,
        address,
      },
    });

    return newUser;
  } catch (error) {
    console.error(error);
  }
};
