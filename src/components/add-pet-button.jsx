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
            className="bg-red-400 hover:bg-red-600 text-white rounded-[30px] shadow-lg w-14 h-14 flex items-center justify-center"
          >
            <Plus className="w-10 h-10" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-sm font-medium">Add a pet</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
