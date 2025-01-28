import React from "react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gray-100">
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

      <div className="absolute top-8 left-8 text-4xl font-extrabold text-black">
        lumo
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-8xl font-extrabold text-white">
          Adopt a pet,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-orange-400">
            hassle-free.
          </span>
        </h1>
      </div>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              <div className="bg-green-500 text-white p-6 rounded-full mb-6">
                <i className="fas fa-paw text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Adopt Easy
              </h3>
              <p className="text-center text-gray-600">
                Our platform simplifies the adoption process for pets, making it
                easy for you to find and adopt the perfect pet.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              <div className="bg-yellow-500 text-white p-6 rounded-full mb-6">
                <i className="fas fa-heart text-4xl"></i>
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
                <i className="fas fa-user-check text-4xl"></i>
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

          {/* Adjusting the bottom 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
            {/* Feature 4 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center">
              <div className="bg-red-500 text-white p-6 rounded-full mb-6">
                <i className="fas fa-shield-alt text-4xl"></i>
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
                <i className="fas fa-clock text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                24/7 Support
              </h3>
              <p className="text-center text-gray-600">
                Our support team is available 24/7 to assist you throughout the
                adoption process, making sure everything goes smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        <video className="w-full object-cover" autoPlay loop muted>
          <source
            src="/videos/Untitled video - Made with Clipchamp.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <footer className="bg-white text-center py-4 absolute bottom-0 left-0 w-full z-10">
        <p className="text-gray-700">Made by Shiva , Tejas , Vishnu , Yadhu</p>
      </footer>
    </div>
  );
}
