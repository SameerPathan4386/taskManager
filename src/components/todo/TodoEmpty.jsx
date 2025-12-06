import { useTodo } from "../../contexts/TodoContexts.jsx";
//not changed
export function TodoEmpty() {
  const { filters } = useTodo();
  
  // Different messages based on filter state
  const getMessage = () => {
    if (filters.search) {
      return "No tasks match your search";
    } else if (filters.status === "completed") {
      return "No completed tasks yet";
    } else if (filters.status === "active") {
      return "No active tasks - take a break!";
    } else if (filters.category !== "all") {
      return `No tasks in this category`;
    } else if (filters.priority !== "all") {
      return `No ${filters.priority} priority tasks`;
    } else {
      return "No tasks yet - add one to get started!";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground animate-fade-in">
      <div className="mb-4 rounded-full bg-secondary p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      </div>
      <h3 className="text-lg font-medium">{getMessage()}</h3>
    </div>
  );
}
