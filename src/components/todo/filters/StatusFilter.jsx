import { Button } from "../../ui/button";

export function StatusFilter({ status, todos, activeTodos, completedTodos, onStatusChange }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Status</h4>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={status === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusChange("all")}
          className="text-xs"
        >
          All ({todos.length})
        </Button>
        <Button
          variant={status === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusChange("active")}
          className="text-xs"
        >
          Active ({activeTodos})
        </Button>
        <Button
          variant={status === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusChange("completed")}
          className="text-xs"
        >
          Completed ({completedTodos})
        </Button>
      </div>
    </div>
  );
}
