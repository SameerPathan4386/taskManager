/*import { useState } from "react";
import { useTodo } from "../../contexts/TodoContexts";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";

export function CategoryManager() {
  const { categories, addCategory, deleteCategory } = useTodo();
  const [newCategory, setNewCategory] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCategory = () => {
    if (!isAdding) {
      setIsAdding(true);
      return;
    }

    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim());
      setNewCategory("");
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddCategory();
    } else if (e.key === "Escape") {
      setNewCategory("");
      setIsAdding(false);
    }
  };

  return (
    <div className="todo-card p-4 animate-fade-in">
      <h3 className="text-base font-medium mb-3">Categories</h3>

      <div className="flex flex-wrap gap-1.5 mb-3">
      {categories.map((category) => (
  <div 
    key={category.id}
    className="flex items-center gap-1 bg-secondary/60 rounded-full py-0.5 px-2 text-sm border border-border/40"
  >
    <span className="text-xs">{category.name}</span>  
    <Button
      variant="ghost"
      size="icon"
      className="h-4 w-4 rounded-full text-muted-foreground hover:text-destructive flex items-center justify-center"
      onClick={() => deleteCategory(category.id)}  
    >
      <Trash2 className="h-3 w-3" />
    </Button>
  </div>
))}


      </div>

      <div className="flex gap-2">
        {isAdding ? (
          <input
            type="text"
            className="flex-1 h-8 rounded-md border border-input bg-transparent px-2 py-1 text-xs"
            placeholder="Category name..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        ) : null}
        <Button
          size="sm"
          variant={isAdding ? "default" : "outline"}
          className="h-8 text-xs flex items-center gap-1 whitespace-nowrap"
          onClick={handleAddCategory}
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{isAdding ? "Add" : "New Category"}</span>
        </Button>
      </div>
    </div>
  );
}
*/
import { useState } from "react";
import { useTodo } from "../../contexts/TodoContexts";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";

export function CategoryManager() {
  const { categories, addCategory, deleteCategory } = useTodo();
  const [newCategory, setNewCategory] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCategory = () => {
    if (!isAdding) {
      setIsAdding(true);
      return;
    }

    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim());
      setNewCategory("");
      setIsAdding(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddCategory();
    } else if (e.key === "Escape") {
      setNewCategory("");
      setIsAdding(false);
    }
  };

  return (
    <div className="todo-card p-4 animate-fade-in">
      <h3 className="text-base font-medium mb-3">Categories</h3>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {categories
          .filter((category) => category && category.name)  // ✅ added filter
          .map((category) => (
            <div 
              key={category.id}
              className="flex items-center gap-1 bg-secondary/60 rounded-full py-0.5 px-2 text-sm border border-border/40"
            >
              <span className="text-xs">{category.name}</span>  
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 rounded-full text-muted-foreground hover:text-destructive flex items-center justify-center"
                onClick={() => deleteCategory(category.id)}  
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
      </div>

      <div className="flex gap-2">
        {isAdding ? (
          <input
            type="text"
            className="flex-1 h-8 rounded-md border border-input bg-transparent px-2 py-1 text-xs"
            placeholder="Category name..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        ) : null}
        <Button
          size="sm"
          variant={isAdding ? "default" : "outline"}
          className="h-8 text-xs flex items-center gap-1 whitespace-nowrap"
          onClick={handleAddCategory}
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{isAdding ? "Add" : "New Category"}</span>
        </Button>
      </div>
    </div>
  );
}

