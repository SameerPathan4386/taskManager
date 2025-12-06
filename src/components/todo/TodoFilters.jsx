import { useTodo } from "../../contexts/TodoContexts";
import { Button } from "../ui/button";
import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { SearchBar } from "./filters/SearchBar";
import { StatusFilter } from "./filters/StatusFilter";
import { PriorityFilter } from "./filters/PriorityFilter";
import { CategoryFilter } from "./filters/CategoryFilter";
import { SortControls } from "./filters/SortControls";

export function TodoFilters() {
  const { filters, setFilters, categories, sortBy, setSort, todos } = useTodo();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState(filters.search);
  
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters({ search: searchValue });
  };

  const handleStatusChange = (status) => {
    setFilters({ status });
  };

  const handlePriorityChange = (priority) => {
    setFilters({ priority });
  };

  const handleCategoryChange = (category) => {
    setFilters({ category });
  };

  const handleSortChange = (sort) => {
    setSort(sort);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const clearFilters = () => {
    setFilters({
      status: "all",
      priority: "all",
      category: "all",
      search: ""
    });
    setSearchValue("");
  };

  const hasActiveFilters = 
    filters.status !== "all" || 
    filters.priority !== "all" || 
    filters.category !== "all" || 
    filters.search !== "";

  return (
    <div className="mb-6 animate-fade-in">
      <div className="todo-card mb-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <SearchBar
              searchValue={searchValue}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={toggleExpanded}
            className="flex items-center gap-1"
          >
            Filters
            {isExpanded ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t animate-slide-in">
            <div className="grid gap-4 md:grid-cols-3">
              <StatusFilter
                status={filters.status}
                todos={todos}
                activeTodos={activeTodos}
                completedTodos={completedTodos}
                onStatusChange={handleStatusChange}
              />
              <PriorityFilter
                priority={filters.priority}
                onPriorityChange={handlePriorityChange}
              />
              <CategoryFilter
                category={filters.category}
                categories={categories}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <SortControls
                sortBy={sortBy}
                onSortChange={handleSortChange}
              />
              
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  onClick={clearFilters}
                  className="text-sm"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
