"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Default placeholder image
const PLACEHOLDER_IMAGE = "/placeholder.svg";

export default function CategoryPage({ params }) {
  const { category } = React.use(params);
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      if (!category) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(
          `/api/pets/by-category?category=${encodeURIComponent(category)}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch pets");
        }

        setPets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching pets:", err);
        setError(err.message);
        toast.error("Failed to load pets", {
          description: err.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets();
  }, [category]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-500">Invalid Category</h1>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Available {category} for Adoption
        </h1>
        <p className="text-gray-600 text-center text-lg">
          No {category}s available for adoption at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Available {category} for Adoption
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pets.map((pet) => (
          <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="relative h-48">
                {pet.petImageUrl ? (
                  <Image
                    src={pet.petImageUrl}
                    alt={`${pet.breed || pet.category}`}
                    fill
                    className="object-cover"
                    priority={false}
                  />
                ) : (
                  <Image
                    src={PLACEHOLDER_IMAGE}
                    alt="Placeholder"
                    fill
                    className="object-cover"
                    priority={false}
                  />
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="space-y-2 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold line-clamp-2">{pet.breed || pet.category}</h3>
                    <span className="text-blue-600 font-medium whitespace-nowrap ml-2">
                      ₹{pet.price.toLocaleString()}
                      {pet.isNegotiable && " (Negotiable)"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">ID: {pet.id}</p>
                  <p className="text-sm text-gray-600">Age: {pet.age} years</p>
                  {pet.color && (
                    <p className="text-sm text-gray-600">Color: {pet.color}</p>
                  )}
                  <p className="text-sm text-gray-600">
                    Vaccination: {pet.vaccinationStatus.toLowerCase().replace(/_/g, " ")}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    Description: {pet.description}
                  </p>
                  <div className="text-xs text-gray-500">
                    Posted by: {pet.owner.id}
                    {pet.owner.phone && (
                      <span className="block">Contact: {pet.owner.phone}</span>
                    )}
                  </div>
                </div>
                <div className="pt-3 mt-auto">
                  <Button 
                    size="sm"
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => {
                      toast.success("Adoption request sent!");
                    }}
                  >
                    Adopt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
