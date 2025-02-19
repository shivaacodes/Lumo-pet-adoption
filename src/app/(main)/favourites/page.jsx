"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function FavouritesPage() {
  const [favoriteCategories, setFavoriteCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFavoriteCategories();
  }, []);

  const fetchFavoriteCategories = async () => {
    try {
      const response = await fetch('/api/favorites/categories');
      if (response.ok) {
        const data = await response.json();
        setFavoriteCategories(data);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (category) => {
    try {
      const response = await fetch('/api/favorites/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }),
      });

      if (response.ok) {
        setFavoriteCategories(prev => 
          prev.filter(fav => fav.category !== category)
        );
        toast.success('Category removed from favorites');
      } else {
        throw new Error('Failed to remove favorite');
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove from favorites');
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-5xl font-semibold text-gray-800 mb-6">
        Favourites 💞
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Favourite Categories */}
        <Card className="shadow-lg shadow-blue-300/50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Favourite Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : favoriteCategories.length > 0 ? (
              <div className="space-y-2">
                {favoriteCategories.map((fav) => (
                  <div
                    key={fav.id}
                    className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                  >
                    <span className="capitalize">{fav.category}</span>
                    <button
                      onClick={() => handleRemoveFavorite(fav.category)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No favourite categories yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Favourite Pets */}
        <Card className="shadow-lg shadow-green-300/50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              Favourite Pets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No favourite pets yet.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
