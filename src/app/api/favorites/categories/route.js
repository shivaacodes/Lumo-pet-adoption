import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(req) {
  try {
    const { userId } = auth();
    const { category } = await req.json();

    if (!userId || !category) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Get user from database using clerkUserId
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if already exists (case insensitive)
    const existing = await db.favoriteCategory.findFirst({
      where: {
        userId: user.id,
        category: {
          equals: category,
          mode: 'insensitive',
        },
      },
    });

    if (existing) {
      // If it exists, delete it (toggle off)
      await db.favoriteCategory.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ message: "Favorite removed" }, { status: 200 });
    }

    // If it doesn't exist, create it (toggle on)
    const favoriteCategory = await db.favoriteCategory.create({
      data: {
        userId: user.id,
        category: category.toLowerCase(),
      },
    });

    return NextResponse.json(favoriteCategory, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/favorites/categories:', error);
    return NextResponse.json(
      { error: "Failed to update favorite" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { userId } = auth();
    const { category } = await req.json();

    if (!userId || !category) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.favoriteCategory.deleteMany({
      where: {
        userId: user.id,
        category: {
          equals: category,
          mode: 'insensitive',
        },
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/favorites/categories:', error);
    return NextResponse.json(
      { error: "Error removing from favorites" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    // Get user from database using clerkUserId
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true }, // Only select the id field for performance
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" }, 
        { status: 404 }
      );
    }

    const favoriteCategories = await prisma.favoriteCategory.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        category: true,
        createdAt: true,
      },
    });

    return NextResponse.json(favoriteCategories);
  } catch (error) {
    console.error('GET /api/favorites/categories error:', error);
    return NextResponse.json(
      { 
        error: "Error fetching favorites",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      }, 
      { status: 500 }
    );
  }
} 