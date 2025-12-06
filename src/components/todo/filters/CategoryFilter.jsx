import { Button } from "../../ui/button";

export function CategoryFilter({ category, categories, onCategoryChange }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Category</h4>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={category === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange("all")}
          className="text-xs"
        >
          All
        </Button>
        
        {categories.map(cat => (
  <Button
    key={cat.id}
    variant={category === cat.name ? "default" : "outline"}
    size="sm"
    onClick={() => onCategoryChange(cat.name)}
    className="text-xs"
  >
    {cat.name}
  </Button>
))}

      </div>
    </div>
  );
}
