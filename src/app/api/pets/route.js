import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Add a pet (POST request)
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      category,
      breed,
      color,
      age,
      price,
      isNegotiable,
      petImageUrl,
      description,
      vaccinationStatus,
      ownerId,
    } = body;

    // Ensure ownerId exists before adding pet
    const owner = await prisma.user.findUnique({ where: { id: ownerId } });
    if (!owner) {
      return NextResponse.json({ error: "Owner not found" }, { status: 404 });
    }
    console.log(body);

    const pet = await prisma.pet.create({
      data: {
        category,
        breed,
        color,
        age,
        price,
        isNegotiable,
        petImageUrl,
        description,
        vaccinationStatus,
        ownerId,
      },
    });

    return NextResponse.json(pet, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error adding pet" }, { status: 500 });
  }
}

// Fetch pets by category (GET request)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json({ error: "Category required" }, { status: 400 });
    }

    const pets = await prisma.pet.findMany({
      where: { category },
    });

    return NextResponse.json(pets);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching pets" }, { status: 500 });
  }
}
