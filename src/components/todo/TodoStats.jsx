import { useTodo } from "../../contexts/TodoContexts.jsx";

export function TodoStats() {
  const { todos } = useTodo();
  
  // If there are no todos, don't render stats
  if (!todos.length) return null;
  
  // Calculate completion stats
  const completed = todos.filter(todo => todo.completed).length;
  const total = todos.length;
  const completionPercentage = Math.round((completed / total) * 100);
  
  // Group by priority
  const priorityCounts = todos.reduce((acc, todo) => {
    acc[todo.priority] = (acc[todo.priority] || 0) + 1;
    return acc;
  }, {});
  
  return (
    <div className="todo-card mb-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-medium">Task Progress</h3>
          <p className="text-sm text-muted-foreground">
            {completed} of {total} tasks completed
          </p>
        </div>
        
        <div className="flex gap-8">
          <div className="text-center">
            <div className="text-2xl font-semibold text-todo-low">
              {priorityCounts.low || 0}
            </div>
            <div className="text-xs text-muted-foreground">Low</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-semibold text-todo-medium">
              {priorityCounts.medium || 0}
            </div>
            <div className="text-xs text-muted-foreground">Medium</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-semibold text-todo-high">
              {priorityCounts.high || 0}
            </div>
            <div className="text-xs text-muted-foreground">High</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-right text-muted-foreground">
          {completionPercentage}% complete
        </div>
      </div>
    </div>
  );
}
