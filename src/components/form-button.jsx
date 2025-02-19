"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function FormButton({ children, isLoading }) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl py-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        children
      )}
    </Button>
  );
}
