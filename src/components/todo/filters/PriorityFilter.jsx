import { Button } from "../../ui/button";

export function PriorityFilter({ priority, onPriorityChange }) {
  const getPriorityColor = (p) => {
    if (priority !== p) return "";
    
    switch(p) {
      case "low":
        return "bg-green-500/20 text-green-700 dark:bg-green-500/30 dark:text-green-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/30 dark:text-yellow-400";
      case "high":
        return "bg-red-500/20 text-red-700 dark:bg-red-500/30 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Priority</h4>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={priority === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onPriorityChange("all")}
          className="text-xs"
        >
          All
        </Button>
        {["low", "medium", "high"].map(p => (
          <Button
            key={p}
            variant={priority === p ? "default" : "outline"}
            size="sm"
            onClick={() => onPriorityChange(p)}
            className={`text-xs ${getPriorityColor(p)}`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}
