import { ThemeToggle } from "../ui/ThemeToggle";

export function TodoHeader() {
  return (
    <header className="w-full flex justify-between items-center py-2 animate-fade-in">
      <div className="space-y-0.5">
        <h1 className="text-2xl sm:text-3xl font-bold">Task Manager</h1>
        <p className="text-sm text-muted-foreground">Organize your day, simplify your life</p>
      </div>
      <ThemeToggle />
    </header>
  );
}
