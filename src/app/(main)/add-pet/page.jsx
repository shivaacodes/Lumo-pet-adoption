"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormButton from "@/components/form-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AddPetPage() {
  const [category, setCategory] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [colors, setColors] = useState([]);
  const [currency, setCurrency] = useState("INR");

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      category: "",
      breed: "",
      color: "",
      age: 1,
      price: 0,
      negotiable: false,
      description: "",
      vaccinationStatus: "",
      petImage: "",
    },
  });

  const onCategoryChange = (value) => {
    setCategory(value);
    setValue("category", value);

    if (value === "dog") {
      setBreeds([
        "Labrador",
        "Bulldog",
        "Poodle",
        "Beagle",
        "Golden Retriever",
      ]);
      setColors(["Brown", "Black", "White", "Golden", "Mixed", "Other"]);
    } else if (value === "cat") {
      setBreeds(["Persian", "Bengal", "Siamese", "Maine Coon", "Sphynx"]);
      setColors(["Gray", "Black", "White", "Orange", "Mixed", "Other"]);
    } else if (value === "rabbit") {
      setBreeds(["Himalayan", "Holland Lop", "Mini Rex", "Mini Lop", "Dutch"]);
      setColors(["White", "Gray", "Brown", "Black", "Mixed", "Other"]);
    } else if (value === "bird") {
      setBreeds(["Parrot", "Canary", "Finch", "Cockatiel", "Lovebird"]);
      setColors(["Green", "Yellow", "Blue", "Red", "Mixed", "Other"]);
    } else if (value === "hamster") {
      setBreeds(["Syrian", "Dwarf", "Roborovski", "Chinese", "Campbell"]);
      setColors(["Golden", "Black", "White", "Brown", "Mixed", "Other"]);
    } else if (value === "ferret") {
      setBreeds(["Polecat", "Sable", "Albino", "Champagne", "Silver"]);
      setColors(["Brown", "Black", "White", "Albino", "Mixed", "Other"]);
    } else {
      setBreeds([]);
      setColors([]);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Send data to backend (will be updated)
  };

  return (
    <div className="min-h-screen p-2 flex justify-center">
      <Card className="w-full max-w-6xl bg-white p-8 border-2 border-gray-300 rounded-3xl shadow-2xl shadow-blue-500/50">
        <CardHeader>
          <CardTitle className="text-5xl font-semibold text-gray-800">
            Add Pet 🐾
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Select Category */}
            <div>
              <Label className="text-xl">Category</Label>
              <Select onValueChange={onCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="rabbit">Rabbit</SelectItem>
                  <SelectItem value="bird">Bird</SelectItem>
                  <SelectItem value="hamster">Hamster</SelectItem>
                  <SelectItem value="ferret">Ferret</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Breed and Color (Side by side) */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <Label className="text-xl">Breed</Label>
                <Select onValueChange={(value) => setValue("breed", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select breed" />
                  </SelectTrigger>
                  <SelectContent>
                    {breeds.map((breed) => (
                      <SelectItem key={breed} value={breed}>
                        {breed}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xl">Color</Label>
                <Select onValueChange={(value) => setValue("color", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Age */}
            <div>
              <Label className="text-xl">Age (in years)</Label>
              <Slider
                defaultValue={[1]}
                min={0}
                max={20}
                step={1}
                onValueChange={(value) => setValue("age", value[0])}
              />
              <p className="text-lg text-gray-500">
                Selected Age: {watch("age")} years
              </p>
            </div>

            {/* Price and Negotiable (Side by side) */}
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center space-x-4">
                <Label className="text-xl">Price (in ₹)</Label>
                <div className="flex items-center space-x-2">
                  <Select
                    className="w-20"
                    value={currency}
                    onValueChange={(value) => setCurrency(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="INR" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    className="text-xl p-6 rounded-2xl w-32"
                    {...register("price")}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Label className="text-xl">Negotiable</Label>
                <Switch
                  onCheckedChange={(checked) => setValue("negotiable", checked)}
                />
              </div>
            </div>

            {/* Vaccination Status */}
            <div>
              <Label className="text-xl">Vaccination Status</Label>
              <Select
                onValueChange={(value) => setValue("vaccinationStatus", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="up-to-date">Up to date</SelectItem>
                  <SelectItem value="not-vaccinated">Not vaccinated</SelectItem>
                  <SelectItem value="partially-vaccinated">
                    Partially vaccinated
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pet Image */}
            <div>
              <Label className="text-xl">Pet Image</Label>
              <Input
                type="file"
                className="text-lg p-2 rounded-xl"
                {...register("petImage")}
              />
            </div>

            <div>
              <Label className="text-xl">Description</Label>
              <Textarea
                placeholder="Write something about the pet..."
                className="text-lg p-6 rounded-2xl"
                {...register("description")}
              />
            </div>

            <FormButton>Add this Pet</FormButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
