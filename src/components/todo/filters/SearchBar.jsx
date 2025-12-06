import { Search } from "lucide-react";
import { Button } from "../../ui/button";

export function SearchBar({ searchValue, onSearchChange, onSearchSubmit }) {
  return (
    <form onSubmit={onSearchSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full rounded-md border border-input bg-transparent py-2 pl-8 pr-4 focus:outline-none focus:ring-1 focus:ring-primary"
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
      <Button type="submit" className="hidden sm:inline-flex">
        Search
      </Button>
    </form>
  );
}
