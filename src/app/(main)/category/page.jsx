"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import categories from "@/app/data/category";
import SearchBar from "@/components/search";
import AdoptPetButton from "@/components/adopt-button";
import LikeButton from "@/components/like-button";
import AddPetButton from "@/components/add-pet-button";
import { toast } from "sonner";

const CategoryPage = ({ params }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pets, setPets] = useState([]);
  const [favoriteCategories, setFavoriteCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Unwrap the params object using React.use()
  const { category } = React.use(params); // Unwrap the category from params

  // Fetch the category-related pets using useEffect or data fetching logic
  useEffect(() => {
    if (category) {
      // Assuming petsData is available and filtered based on category
      const filteredPets = petsData.filter((pet) => pet.category === category);
      setPets(filteredPets);
    }
  }, [category]);

  // Fetch favorite categories on component mount
  useEffect(() => {
    fetchFavoriteCategories();
  }, []);

  const fetchFavoriteCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/favorites/categories');
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch favorites');
      }
      
      const data = await response.json();
      setFavoriteCategories(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Failed to load favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteToggle = async (category) => {
    try {
      // Convert category to lowercase for consistency
      const categoryLower = category.toLowerCase();
      const isFavorite = favoriteCategories.some(fav => fav.category.toLowerCase() === categoryLower);
      
      const response = await fetch('/api/favorites/categories', {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: categoryLower }),
      });

      if (response.ok) {
        if (isFavorite) {
          setFavoriteCategories(prev => 
            prev.filter(fav => fav.category.toLowerCase() !== categoryLower)
          );
        } else {
          const newFavorite = await response.json();
          setFavoriteCategories(prev => [...prev, newFavorite]);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div className="min-h-screen text-gray-900 p-8 flex flex-col items-center relative">
      {/* SearchBar & AddPetButton container */}
      <div className="w-full max-w-xl flex items-center justify-between mb-8">
        <SearchBar
          className="bg-gray-100 flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AddPetButton />
      </div>

      <h1 className="text-7xl font-bold mb-6 mt-7 font-poppins text-center text-gray-800">
        Categories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl mt-7">
        {categories.map((category, index) => (
          <div key={index} className="relative">
            <div className="absolute top-4 right-4 z-10">
              {isLoading ? (
                <div className="animate-pulse w-6 h-6 bg-gray-200 rounded-full" />
              ) : (
                <LikeButton
                  isLiked={favoriteCategories.some(
                    fav => fav.category.toLowerCase() === category.category.toLowerCase()
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteToggle(category.category);
                  }}
                />
              )}
            </div>
            <div
              className={`p-4 rounded-2xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col items-center text-center ${category.bgColor} hover:${category.hoverColor}`}
              onClick={() => handleCategoryClick(category.category)}
            >
              <div className="relative mb-6">
                <img
                  src={`/images/${category.category.toLowerCase()}.png`}
                  alt={category.category}
                  className="w-64 h-64 object-cover rounded-full mb-4 transform -translate-y-12 transition-all duration-500"
                />
              </div>

              <div className="bg-white p-4 rounded-xl w-full text-gray-800">
                <h2 className="text-lg font-semibold mb-2">
                  {category.category}
                </h2>
                <p className="text-sm text-gray-600">
                  {category.description.slice(0, 100)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 opacity-0 animate-fadeIn transition-opacity duration-300">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-3xl w-full transform scale-95 animate-scaleUp transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedCategory}
              </h2>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-red-500 font-semibold text-xl hover:text-red-700 transition-colors duration-300"
              >
                X
              </button>
            </div>
            <img
              src={`/images/${selectedCategory.toLowerCase()}.png`}
              alt={selectedCategory}
              className="w-64 h-64 object-cover rounded-full mb-4 transform -translate-y-10"
            />
            <p className="text-lg text-gray-600">
              {
                categories.find((cat) => cat.category === selectedCategory)
                  ?.description
              }
            </p>
            <div className="mt-4 text-md text-gray-600">
              <p>
                Friendliness:{" "}
                {
                  categories.find((cat) => cat.category === selectedCategory)
                    ?.friendliness
                }
              </p>
              <p>
                Avg Monthly Expense: ₹
                {
                  categories.find((cat) => cat.category === selectedCategory)
                    ?.avgMonthlyExpense
                }
              </p>
              <p>
                Need for Attention:{" "}
                {
                  categories.find((cat) => cat.category === selectedCategory)
                    ?.needForAttention
                }
                /10
              </p>
              <p>
                Loyalty:{" "}
                {
                  categories.find((cat) => cat.category === selectedCategory)
                    ?.loyalty
                }
                /10
              </p>
            </div>

            <div className="mt-6 flex justify-between">
              <AdoptPetButton
                onClick={() => router.push(`/category/${selectedCategory}`)}
              />
              <LikeButton
                isLiked={favoriteCategories.some(
                  fav => fav.category === selectedCategory
                )}
                onClick={() => handleFavoriteToggle(selectedCategory)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
