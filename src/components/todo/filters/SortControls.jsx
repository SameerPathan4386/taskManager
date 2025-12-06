import { Button } from "../../ui/button";
import { ArrowDownAZ, ArrowDownWideNarrow, Calendar } from "lucide-react";

export function SortControls({ sortBy, onSortChange }) {
  const sortOptions = [
    { value: "date", label: "Date", icon: Calendar },
    { value: "priority", label: "Priority", icon: ArrowDownWideNarrow },
    { value: "alphabetical", label: "A-Z", icon: ArrowDownAZ }
  ];

  return (
    <div className="space-y-1">
      <h4 className="text-sm font-medium">Sort by</h4>
      <div className="flex gap-2">
        {sortOptions.map(option => {
          const Icon = option.icon;
          return (
            <Button
              key={option.value}
              variant={sortBy === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onSortChange(option.value)}
              className="text-xs"
            >
              {Icon && <Icon className="h-3.5 w-3.5 mr-1" />}
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
