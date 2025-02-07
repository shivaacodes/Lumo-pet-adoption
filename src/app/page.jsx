import React from "react";
import Header from "@/components/header";
import { PawPrint, Heart, UserCheck, Shield, Clock, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full object-cover object-bottom"
        autoPlay
        loop
        muted
      >
        <source
          src="/videos/Dog-1 - Made with Clipchamp.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <Header />

      {/* Brand Name */}
      <div className="absolute top-8 left-8 text-4xl font-extrabold text-black">
        lumo
      </div>

      {/* Main Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-8xl font-extrabold text-white text-center">
          Adopt a pet,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
            hassle-free.
          </span>
        </h1>
      </div>

      {/* Key Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Key Features
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              <div className="bg-green-500 text-white p-6 rounded-full mb-6">
                <PawPrint className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Adopt Easy
              </h3>
              <p className="text-center text-gray-600">
                Our platform simplifies the adoption process, making it easy to
                find and adopt the perfect pet.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              <div className="bg-yellow-500 text-white p-6 rounded-full mb-6">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Love & Care
              </h3>
              <p className="text-center text-gray-600">
                We ensure every pet receives the love and care they deserve,
                connecting them with the best homes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              <div className="bg-blue-500 text-white p-6 rounded-full mb-6">
                <UserCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Verified Profiles
              </h3>
              <p className="text-center text-gray-600">
                All pet profiles are verified to ensure you have accurate
                information, making the adoption process trustworthy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
            {/* Feature 4 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              <div className="bg-red-500 text-white p-6 rounded-full mb-6">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Secure Transactions
              </h3>
              <p className="text-center text-gray-600">
                All transactions on our platform are secured to ensure safe and
                reliable adoption for both pets and adopters.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              <div className="bg-purple-500 text-white p-6 rounded-full mb-6">
                <Clock className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                24/7 Support
              </h3>
              <p className="text-center text-gray-600">
                Our support team is available 24/7 to assist you throughout the
                adoption process, ensuring everything runs smoothly.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-pink-500 text-white p-6 rounded-full mb-6">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Community Support
              </h3>
              <p className="text-gray-600">
                Join our community of pet lovers to share experiences, tips, and
                support for a better adoption journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Background Video at the Bottom */}
      <div className="relative">
        <video className="w-full object-cover" autoPlay loop muted>
          <source
            src="/videos/Untitled video - Made with Clipchamp.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
