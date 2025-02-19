import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { uploadFile } from "@/lib/uploadFile";
import { checkUser } from "@/lib/checkUser";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure user exists in our database
    const user = await checkUser();
    if (!user) {
      return NextResponse.json(
        { error: "Failed to authenticate user" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    // Validate required fields
    const requiredFields = ["category", "age", "price", "description", "vaccinationStatus"];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Extract and validate form data
    const data = {
      category: formData.get("category"),
      breed: formData.get("breed") || null,
      color: formData.get("color") || null,
      age: parseInt(formData.get("age")),
      price: parseInt(formData.get("price")),
      isNegotiable: formData.get("negotiable") === "true",
      description: formData.get("description"),
      vaccinationStatus: formData.get("vaccinationStatus"),
    };

    // Validate numeric fields
    if (isNaN(data.age) || isNaN(data.price)) {
      return NextResponse.json(
        { error: "Invalid age or price value" },
        { status: 400 }
      );
    }

    // Handle file upload
    const petImageFile = formData.get("petImage");
    if (petImageFile) {
      try {
        // Check file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(petImageFile.type)) {
          return NextResponse.json(
            { error: "Invalid file type. Only JPEG, PNG and WebP are allowed" },
            { status: 400 }
          );
        }

        // Check file size (5MB limit)
        const fiveMB = 5 * 1024 * 1024;
        if (petImageFile.size > fiveMB) {
          return NextResponse.json(
            { error: "File size too large. Maximum size is 5MB" },
            { status: 400 }
          );
        }

        data.petImageUrl = await uploadFile(petImageFile);
      } catch (error) {
        console.error("File upload error:", error);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    // Validate vaccination status
    if (!Object.values(PetStatus).includes(data.vaccinationStatus)) {
      return NextResponse.json(
        { error: "Invalid vaccination status" },
        { status: 400 }
      );
    }

    // Create the pet in the database
    const pet = await db.pet.create({
      data: {
        ...data,
        ownerId: user.id,
      },
    });

    return NextResponse.json(pet, { status: 201 });
  } catch (error) {
    console.error("Error adding pet:", error);
    return NextResponse.json(
      { 
        error: "Error adding pet", 
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}

// Add PetStatus enum to match Prisma schema
const PetStatus = {
  UPTODATE: 'UPTODATE',
  PARTIALVACCINATED: 'PARTIALVACCINATED',
  NOTVACCINATED: 'NOTVACCINATED'
};
