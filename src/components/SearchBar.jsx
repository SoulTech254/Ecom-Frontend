import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SearchBar = ({ onSave }) => {
  const formSchema = z.string().min(1).max(50);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
  });
  return (
    <div className="w-full border rounded-full px-4 py-4 bg-white">
      <form
        className="flex justify-between items-center"
        onSubmit={handleSubmit(onSave)}
      >
        <input
          className="w-full focus:outline-none"
          {...register("searchQuery")}
          type="text"
        />
        <button type="submit">
          <Search />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
