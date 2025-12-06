import { useTodo } from "../../contexts/TodoContexts.jsx";
import { TodoItem } from "./TodoItem.jsx";
import { TodoEmpty } from "./TodoEmpty.jsx";

export function TodoList() {
  const { filteredTodos } = useTodo();

  if (filteredTodos.length === 0) {
    return <TodoEmpty />;
  }

  return (
    <div className="todo-section">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
//unchnaged