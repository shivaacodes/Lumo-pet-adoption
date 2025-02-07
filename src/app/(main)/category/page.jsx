"use client";

import React, { useState } from "react";
import categories from "@/app/data/category";
import SearchBar from "@/components/search";
import AdoptPetButton from "@/components/adopt-button";

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  // Filter and sort categories based on search query
  const filteredCategories = categories
    .filter((category) =>
      category.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aStartsWith = a.category
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase());
      const bStartsWith = b.category
        .toLowerCase()
        .startsWith(searchQuery.toLowerCase());
      if (aStartsWith && !bStartsWith) return -1; // Put a before b
      if (!aStartsWith && bStartsWith) return 1; // Put b before a
      return 0; // No change if both are similar
    });

  return (
    <div className="min-h-screen text-gray-900 p-8 flex flex-col items-center relative">
      <SearchBar
        className="bg-gray-100 w-full max-w-xl mb-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
      />
      <h1 className="text-7xl font-bold mb-6 mt-7 font-poppins text-center text-gray-800">
        Categories
      </h1>

      {/* Display cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl mt-7">
        {filteredCategories.map((category, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col items-center text-center ${category.bgColor} hover:${category.hoverColor}`}
            onClick={() => handleCategoryClick(category.category)}
          >
            {/* Image section */}
            <div className="relative mb-6">
              <img
                src={`/images/${category.category.toLowerCase()}.png`}
                alt={category.category}
                className="w-64 h-64 object-cover rounded-full mb-4 transform -translate-y-12 transition-all duration-500"
              />
            </div>

            {/* Data section with white background */}
            <div className="bg-white p-4 rounded-xl w-full text-gray-800">
              <h2 className="text-lg font-semibold mb-2">
                {category.category}
              </h2>
              <p className="text-sm text-gray-600">
                {category.description.slice(0, 100)}...{" "}
              </p>
              {/* Shortened description */}
            </div>
          </div>
        ))}
      </div>

      {/* Popup content when category is clicked */}
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

            <div className="mt-6">
              <AdoptPetButton
                onClick={() => console.log(`Adopting ${selectedCategory}`)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
