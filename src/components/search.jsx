import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-xl p-6">
      <Search
        className="absolute left-8 top-1/2 transform -translate-y-1/2 text-blue-500"
        size={28}
      />
      <Input
        type="text"
        placeholder="Search category..."
        className="pl-14 w-full h-12 rounded-xl border border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-300 text-2xl placeholder-gray-500 shadow-xl"
      />
    </div>
  );
};

export default SearchBar;
