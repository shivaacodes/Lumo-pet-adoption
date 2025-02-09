import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/lib/uploadFile";

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Extract form data
    const age = parseInt(formData.get("age"));
    const breed = formData.get("breed");
    const category = formData.get("category");
    const color = formData.get("color");
    const description = formData.get("description");
    const isNegotiable = formData.get("negotiable") === "true";
    const price = parseInt(formData.get("price"));
    const vaccinationStatus = formData.get("vaccinationStatus").toUpperCase();
    const ownerId = parseInt(formData.get("ownerId")); // Assuming ownerId is passed in the form

    // Handle file upload
    const petImageFile = formData.get("petImage");
    let petImageUrl = null;

    if (petImageFile) {
      petImageUrl = await uploadFile(petImageFile); // Upload the file and get the URL
    }

    // Ensure ownerId exists before adding pet
    const owner = await prisma.user.findUnique({ where: { id: ownerId } });
    if (!owner) {
      return NextResponse.json({ error: "Owner not found" }, { status: 404 });
    }

    // Map vaccinationStatus to the correct enum value
    const validVaccinationStatuses = [
      "UPTODATE",
      "PARTIALVACCINATED",
      "NOTVACCINATED",
    ];
    if (!validVaccinationStatuses.includes(vaccinationStatus)) {
      return NextResponse.json(
        { error: "Invalid vaccination status" },
        { status: 400 }
      );
    }

    // Create the pet in the database
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
    console.error("Error adding pet:", error);
    return NextResponse.json({ error: "Error adding pet" }, { status: 500 });
  }
}
