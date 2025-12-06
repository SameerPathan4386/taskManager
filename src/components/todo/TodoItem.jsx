/*import { useState } from "react";
import { Check, Edit, Trash2 } from "lucide-react";
import { useTodo } from "../../contexts/TodoContexts.jsx";
import { Button } from "../ui/button.jsx";
import { formatDistanceToNow } from "date-fns";

export function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    if (isEditing) {
      updateTodo(todo.id, { title: editedTitle });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateTodo(todo.id, { title: editedTitle });
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setEditedTitle(todo.title);
      setIsEditing(false);
    }
  };

  const getPriorityColor = () => {
    if (todo.completed) return "todo-completed";
    return `todo-${todo.priority}`;
  };

  return (
    <div
      className={`todo-card flex items-center gap-3 group animate-fade-in hover:shadow-md ${
        todo.completed ? "opacity-70" : ""
      }`}
    >
      <button
        className={`h-5 w-5 rounded-full border-2 text-white border-${getPriorityColor()} flex items-center justify-center ${
          todo.completed ? "bg-muted" : `hover:bg-${getPriorityColor()}/20`
        }`}
        onClick={() => toggleTodo(todo.id)}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed && <Check className="h-3 w-3" />}
      </button>

      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            className="w-full bg-transparent border-b border-primary py-1 px-0 focus:outline-none focus:ring-0"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyPress}
            autoFocus
          />
        ) : (
          <div
            className={`line-clamp-2 ${
              todo.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {todo.title}
          </div>
        )}

        <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
          {todo.dueDate && (
            <span className="bg-secondary rounded-full py-0.5 px-2">
              {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
          {todo.category && (
            <span className="bg-primary/10 rounded-full py-0.5 px-2">
              {todo.category}
            </span>
          )}
          <span className="ml-auto">
            {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
          </span>
        </div>
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full text-destructive"
          onClick={() => deleteTodo(todo.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
*/
//unchanged
import { useState } from "react";
import { Check, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useTodo } from "../../contexts/TodoContexts.jsx";
import { Button } from "../ui/button.jsx";
import { formatDistanceToNow } from "date-fns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { format } from "date-fns";

export function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo, updateTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      updateTodo(todo.id, { title: editedTitle });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateTodo(todo.id, { title: editedTitle });
      setIsEditing(false);
    } else if (e.key === "Escape") {
      setEditedTitle(todo.title);
      setIsEditing(false);
    }
  };

  const getPriorityColor = () => {
    if (todo.completed) return "todo-completed";
    return `todo-${todo.priority}`;
  };

  return (
    <div
      className={`todo-card flex flex-col gap-3 group animate-fade-in hover:shadow-md ${
        todo.completed ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          className={`h-5 min-w-5 rounded-full border-2 text-white border-${getPriorityColor()} flex items-center justify-center ${
            todo.completed ? "bg-muted" : `hover:bg-${getPriorityColor()}/20`
          }`}
          onClick={() => toggleTodo(todo.id)}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed && <Check className="h-3 w-3" />}
        </button>

        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              className="w-full bg-transparent border-b border-primary py-1 px-0 focus:outline-none focus:ring-0"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={handleKeyPress}
              autoFocus
            />
          ) : (
            <div
              className={`line-clamp-2 ${
                todo.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {todo.title}
            </div>
          )}

          <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
          {todo.due_date && (
           
      <span className="bg-secondary rounded-min-w-300px py-0.5 px-2">
       {format(new Date(todo.due_date), "MMM d, yyyy")}
       </span>
        )}
            {todo.category && (
              <span className="bg-primary/10 rounded-min-w-300px py-0.5 px-2">
                {todo.category}
              </span>
            )}
            <span className="ml-auto">
            {formatDistanceToNow(new Date(todo.created_at), { addSuffix: true })}
          </span>
          </div>
        </div>

        <div className="flex gap-1">
          {todo.description && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          )}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full text-destructive"
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {todo.description && (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent className="text-sm text-muted-foreground pl-8 pr-4 pb-2">
            {todo.description}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}