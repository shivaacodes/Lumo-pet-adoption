"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const AdoptPetButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-110 transition-all duration-300"
    >
      Adopt a Pet 🎉
    </Button>
  );
};

export default AdoptPetButton;
