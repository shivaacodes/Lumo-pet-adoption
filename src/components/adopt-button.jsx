"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const AdoptPetButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
    >
      Adopt a Pet 🎉
    </Button>
  );
};

export default AdoptPetButton;
