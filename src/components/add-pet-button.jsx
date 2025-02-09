import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

export default function AddPetButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/add-pet");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            className="bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg w-12 h-12 flex items-center justify-center"
          >
            <Plus className="w-8 h-8" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-sm font-medium">Add a pet</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
