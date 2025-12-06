/*
import { useState } from "react";
import { useTodo } from "../../contexts/TodoContexts.jsx";
import { Button } from "../ui/button.jsx";
import { Plus, CalendarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calender.jsx";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function TodoForm() {
  const { addTodo, categories } = useTodo();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTodo({
      title: title.trim(),
      dueDate: dueDate ? dueDate.toISOString().split("T")[0] : null,
      priority,
      category: category || null,
    });

    // Reset form
    setTitle("");
    setDueDate(null);
    setPriority("medium");
    setCategory("");

    // Collapse the form if there are no options selected
    if (!dueDate && !category && priority === "medium") {
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <form 
      className="todo-card mb-8 animate-fade-in transition-all" 
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 rounded-full border-2 border-primary flex-shrink-0" />
        
        <input
          type="text"
          className="flex-1 bg-transparent border-b border-transparent py-2 px-0 focus:outline-none focus:ring-0 focus:border-primary text-lg"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
        />
        
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={toggleExpand}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4 animate-slide-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 relative z-20">
              <label className="text-sm font-medium" htmlFor="due-date">
                Due Date
              </label>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="due-date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-0 bg-popover shadow-lg" 
                  align="start" 
                  sideOffset={8}
                  style={{ zIndex: 50 }}
                >
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => {
                      setDueDate(date);
                    }}
                    initialFocus
                    className="p-4 pointer-events-auto"
                    classNames={{
                      head_row: "flex justify-between mb-2",
                      head_cell: "text-muted-foreground w-9 text-center text-xs",
                      row: "flex justify-between mb-1",
                      cell: "w-9 h-9 text-center hover:bg-accent rounded-md",
                      day: "w-9 h-9 hover:bg-primary hover:text-primary-foreground rounded-md transition-colors"
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className="w-full rounded-md border border-input bg-transparent px-3 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">No category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <div className="flex gap-2">
              {["low", "medium", "high"].map((p) => (
                <Button
                  key={p}
                  type="button"
                  size="sm"
                  variant={priority === p ? "default" : "outline"}
                  className={`capitalize ${
                    priority === p ? "bg-todo-" + p : ""
                  }`}
                  onClick={() => setPriority(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Add Task
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
*/
//not chnageed
import { useState } from "react";
import { useTodo } from "../../contexts/TodoContexts.jsx";
import { Button } from "../ui/button.jsx";
import { Plus, CalendarIcon } from "lucide-react";
import { Input } from "../ui/input.jsx";
import { Textarea } from "../ui/textarea.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Calendar } from "../ui/calender.jsx";
import { format } from "date-fns";
import { cn } from "../../lib/utils.js";


export function TodoForm() {
  const { addTodo, categories } = useTodo();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTodo({
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate ? dueDate.toISOString().split("T")[0] : null,
      priority,
      category: category || null,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate(null);
    setPriority("medium");
    setCategory("");

    // Collapse the form if there are no options selected
    if (!dueDate && !category && priority === "medium") {
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <form 
      className="todo-card mb-8 animate-fade-in transition-all" 
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 rounded-full border-2 border-primary flex-shrink-0" />
        
        <input
          type="text"
          className="flex-1 bg-transparent border-b border-transparent py-2 px-0 focus:outline-none focus:ring-0 focus:border-primary text-lg"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
        />
        
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={toggleExpand}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4 animate-slide-in">
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Add a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 relative z-20">
              <label className="text-sm font-medium" htmlFor="due-date">
                Due Date
              </label>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="due-date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-0 bg-popover shadow-lg" 
                  align="start" 
                  sideOffset={8}
                  style={{ zIndex: 50 }}
                >
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => {
                      setDueDate(date);
                    }}
                    initialFocus
                    className="p-4 pointer-events-auto"
                    classNames={{
                      head_row: "flex justify-between mb-2",
                      head_cell: "text-muted-foreground w-9 text-center text-xs",
                      row: "flex justify-between mb-1",
                      cell: "w-9 h-9 text-center hover:bg-accent rounded-md",
                      day: "w-9 h-9 hover:bg-primary hover:text-primary-foreground rounded-md transition-colors"
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className="w-full rounded-md border border-input bg-black text-gray-400 px-3 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">No category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <div className="flex gap-2">
              {["low", "medium", "high"].map((p) => (
                <Button
                  key={p}
                  type="button"
                  size="sm"
                  variant={priority === p ? "default" : "outline"}
                  className={`capitalize ${
                    priority === p ? "bg-todo-" + p : ""
                  }`}
                  onClick={() => 
                    setPriority(p)
                  }
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Add Task
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}