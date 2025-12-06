import { TodoProvider } from "../contexts/TodoContexts";
import { ThemeProvider } from "../contexts/ThemeContexts";
import { TodoHeader } from "../components/todo/TodoHeader";
import { TodoForm } from "../components/todo/TodoForm";
import { TodoList } from "../components/todo/TodoList";
import { TodoFilters } from "../components/todo/TodoFilters";
import { TodoStats } from "../components/todo/TodoStats";
import { CategoryManager } from "../components/todo/CategoryManager";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { LogOut } from "lucide-react";

const Index = () => {
  const { signOut } = useAuth();

  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="min-h-screen w-full bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mb-4">
              <TodoHeader />
              <Button
                variant="outline"
                onClick={signOut}
                size="sm"
                className="h-8 px-3 text-sm"
              >
                <LogOut className="mr-1.5 h-3.5 w-3.5" />
                Logout
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <TodoStats />
                <TodoForm />
                <TodoFilters />
                <TodoList />
              </div>
              <div className="lg:sticky lg:top-4 h-fit">
                <CategoryManager />
              </div>
            </div>
          </div>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
};

export default Index;
