import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-poppins">
      <div className="bg-white p-10 rounded-3xl shadow-lg max-w-lg w-full text-center space-y-6 border border-gray-200">
        <div className="flex justify-center">
          <div className="bg-red-100 p-4 rounded-full">
            <PawPrint className="w-16 h-16 text-red-500" />
          </div>
        </div>

        <h1 className="text-7xl font-extrabold text-gray-900 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-medium text-gray-800">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Looks like this page has run away like a playful puppy. Let’s get you
          back home!
        </p>

        <Link
          href="category"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
