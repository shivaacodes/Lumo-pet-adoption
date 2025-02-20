import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category")?.toLowerCase();

    if (!category) {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      );
    }

    const pets = await db.pet.findMany({
      where: {
        category: {
          equals: category,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        category: true,
        breed: true,
        color: true,
        age: true,
        price: true,
        isNegotiable: true,
        description: true,
        vaccinationStatus: true,
        petImageUrl: true,
        createdAt: true,
        owner: {
          select: {
            name: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedPets = pets.map(pet => ({
      ...pet,
      breed: pet.breed || pet.category,
      color: pet.color || '',
      petImageUrl: pet.petImageUrl || '/placeholder.svg',
      owner: {
        name: pet.owner?.name || 'Anonymous',
        phone: pet.owner?.phone || '',
      },
    }));

    return NextResponse.json(formattedPets);
  } catch (error) {
    console.error('Error fetching pets by category:', error);
    return NextResponse.json(
      { error: "Failed to fetch pets" },
      { status: 500 }
    );
  }
} 