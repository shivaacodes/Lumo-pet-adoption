import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FavouritesPage() {
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
            <p className="text-gray-500">No favourite categories yet.</p>
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
