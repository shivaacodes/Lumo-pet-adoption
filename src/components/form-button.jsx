import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const FormButton = ({ isLoading, children, ...props }) => {
  return (
    <Button
      className={`w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 text-xl font-bold${
        isLoading ? "cursor-wait" : ""
      }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner size="sm" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default FormButton;
