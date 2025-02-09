"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CategoryPage({ params }) {
  const { category } = params;
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null); // Clear previous errors on category change
    fetch(`/api/pets?category=${category}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch pets");
        }
        return res.json();
      })
      .then((data) => {
        setPets(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [category]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading pets...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        {category} Available for Adoption
      </h1>

      {error ? (
        <div className="text-red-500 p-4 rounded-md bg-red-50">
          Error: {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <Card
                key={pet.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedPet(pet)}
              >
                <CardHeader className="p-0">
                  <div className="aspect-square relative">
                    <img
                      src={pet.image || "/placeholder.svg"}
                      alt={pet.name}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{pet.name}</h3>
                  <Badge variant="secondary">{pet.breed}</Badge>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Age: {pet.age} years
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center p-8 bg-muted rounded-lg">
              No pets available for adoption in this category.
            </div>
          )}
        </div>
      )}

      {selectedPet && (
        <Dialog open={true} onOpenChange={() => setSelectedPet(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedPet.name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img
                  src={selectedPet.image || "/placeholder.svg"}
                  alt={selectedPet.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Badge>{selectedPet.breed}</Badge>
                  <Badge variant="outline">{selectedPet.age} years old</Badge>
                </div>
                {selectedPet.description && (
                  <p className="text-muted-foreground">
                    {selectedPet.description}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedPet(null)}>
                  Close
                </Button>
                <Button>Contact About Adoption</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
