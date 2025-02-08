import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AddPetButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-[30px] shadow-lg w-14 h-14 flex items-center justify-center">
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
