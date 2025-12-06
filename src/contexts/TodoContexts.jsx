/*import { createContext, useContext, useEffect, useReducer } from "react";
import { supabase } from "@/integrations/supabase/client"; // ✅ Your correct supabase path

// Initial state
const initialState = {
  todos: [],
  categories: ["Work", "Personal", "Shopping", "Health"],
  filters: {
    status: "all",    // all, active, completed
    priority: "all",  // all, low, medium, high
    category: "all",
    search: "",
  },
  sortBy: "date", // date, priority, alphabetical
};

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        todos: action.payload.todos || [],
        categories: action.payload.categories || state.categories,
      };
    case "ADD_TODO":
      return { ...state, todos: [action.payload, ...state.todos] };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((cat) => cat !== action.payload),
        todos: state.todos.map((todo) =>
          todo.category === action.payload ? { ...todo, category: null } : todo
        ),
      };
    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload,
      };
    default:
      return state;
  }
}

// Create Context
const TodoContext = createContext();

// Provider
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load from localStorage on first render
  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const savedData = localStorage.getItem(`todo-data-${user.id}`);
      if (savedData) {
        const { todos, categories } = JSON.parse(savedData);
        dispatch({
          type: "INITIALIZE",
          payload: { todos, categories },
        });
      }
    };

    loadData();
  }, []);

  // Save to localStorage when todos or categories change
  useEffect(() => {
    const saveData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      localStorage.setItem(
        `todo-data-${user.id}`,
        JSON.stringify({
          todos: state.todos,
          categories: state.categories,
        })
      );
    };

    saveData();
  }, [state.todos, state.categories]);

  // Filtered and sorted todos
  const getFilteredTodos = () => {
    const { status, priority, category, search } = state.filters;

    return state.todos
      .filter((todo) => {
        if (status === "active" && todo.completed) return false;
        if (status === "completed" && !todo.completed) return false;
        if (priority !== "all" && todo.priority !== priority) return false;
        if (category !== "all" && todo.category !== category) return false;
        if (search && !todo.title.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        switch (state.sortBy) {
          case "date":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "priority": {
            const priorityWeight = { high: 3, medium: 2, low: 1 };
            return priorityWeight[b.priority] - priorityWeight[a.priority];
          }
          case "alphabetical":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  };

  // Helper functions
  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false,
      ...todo,
    };
    dispatch({ type: "ADD_TODO", payload: newTodo });
    return newTodo;
  };

  const updateTodo = (id, updates) => {
    dispatch({ type: "UPDATE_TODO", payload: { id, ...updates } });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const toggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const addCategory = (category) => {
    dispatch({ type: "ADD_CATEGORY", payload: category });
  };

  const deleteCategory = (category) => {
    dispatch({ type: "DELETE_CATEGORY", payload: category });
  };

  const setFilters = (filters) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  };

  const setSort = (sortBy) => {
    dispatch({ type: "SET_SORT", payload: sortBy });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        categories: state.categories,
        filters: state.filters,
        sortBy: state.sortBy,
        filteredTodos: getFilteredTodos(),
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        addCategory,
        deleteCategory,
        setFilters,
        setSort,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used inside a TodoProvider");
  }
  return context;
};
*/


import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const { toast } = useToast();
  const [user, setUser] = useState(null);

  const initialState = {
    todos: [],
    categories: [],
    filters: {
      status: "all", // all, active, completed
      priority: "all", // all, low, medium, high
      category: "all",
      search: "",
    },
    sortBy: "date", // date, priority, alphabetical
  };

  function todoReducer(state, action) {
    switch (action.type) {
      case "INITIALIZE":
        return { ...state, todos: action.payload.todos || [], categories: action.payload.categories || [] };
      case "ADD_TODO":
        return { ...state, todos: [action.payload, ...state.todos] };
      case "UPDATE_TODO":
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
          ),
        };
      case "DELETE_TODO":
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== action.payload),
        };
      case "TOGGLE_TODO":
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
          ),
        };
      case "SET_FILTERS":
        return { ...state, filters: { ...state.filters, ...action.payload } };
      case "SET_SORT":
        return { ...state, sortBy: action.payload };
       //Changes Done---------------------------------
       case "ADD_CATEGORY":
        return {
          ...state,
          categories: [...state.categories, action.payload],
        };
      
      case "DELETE_CATEGORY":
        return {
          ...state,
          categories: state.categories.filter((c) => c.id !== action.payload),
        };
      //-----------------------------------------------
      case "INITIALIZE_CATEGORIES":
        return { ...state, categories: action.payload.categories || [] };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(todoReducer, initialState);
  /*changes made 
  const addCategory = (category) => {
    dispatch({ type: "ADD_CATEGORY", payload: category });
  };*/
  //changesmade 2
  const addCategory = async (categoryName) => {
    if (!user) return;
  
    const { data, error } = await supabase
      .from("categories")
      .insert([{ name: categoryName, user_id: user.id }])
      .select()
      .single();
  
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add category.",
      });
    } else {
      dispatch({ type: "ADD_CATEGORY", payload: data });
      toast({
        variant: "success",
        title: "Success",
        description: "Category added.",
      });
    }
  };
  
//Delete Category  
/*
  const deleteCategory = (category) => {
    dispatch({ type: "DELETE_CATEGORY", payload: category });
  };*/
//Delete Category change 2
const deleteCategory = async (categoryId) => {
  if (!user) return;

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to delete category.",
    });
  } else {
    dispatch({ type: "DELETE_CATEGORY", payload: categoryId });
    toast({
      variant: "success",
      title: "Success",
      description: "Category deleted.",
    });
  }
};



  
  // Fetch current user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

 /* // Fetch Todos from Supabase
  useEffect(() => {
    if (!user) return;

    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching todos:", error.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load todos.",
        });
      } else {
        dispatch({ type: "INITIALIZE", payload: { todos: data } });
      }
    };

    fetchTodos();
  }, [user]);*/
  // Fetch Todos and Categories from Supabase
useEffect(() => {
  if (!user) return;

  const fetchTodosAndCategories = async () => {
    // Fetch todos
    const { data: todosData, error: todosError } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    // Fetch categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (todosError || categoriesError) {
      console.error("Error fetching data:", todosError || categoriesError);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load todos or categories.",
      });
    } else {
      dispatch({
        type: "INITIALIZE",
        payload: {
          todos: todosData || [],
          categories: categoriesData || [],
        },
      });
    }
  };

  fetchTodosAndCategories(); // <== call it inside useEffect
}, [user]);


  //Fetching Categories
  useEffect(() => {
    if (!user) return;
  
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });
  
      if (error) {
        console.error("Error fetching categories:", error.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load categories.",
        });
      } else {
        dispatch({ type: "INITIALIZE_CATEGORIES", payload: { categories: data } });
      }
    };
  
    fetchCategories();
  }, [user]);
  

  // Add new Todo
  /*const addTodo = async (todo) => {
    if (!user) return;

    const newTodo = {
      title: todo.title,
      description: todo.description,
      due_date: todo.dueDate,
      priority: todo.priority,
      category: todo.category,
      completed: false,
      user_id: user.id,
    };

    const { data, error } = await supabase.from("todos").insert([newTodo]).select().single();

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add todo.",
      });
    } else {
      dispatch({ type: "ADD_TODO", payload: data });
    }
  };
*/

const addTodo = async (todo) => {
  if (!user) return;

  const newTodo = {
    title: todo.title,
    description: todo.description,
    due_date: todo.dueDate,
    priority: todo.priority,
    category: todo.category,
    completed: false,
    user_id: user.id,
    email: user.email,
  };

  const { data, error } = await supabase
    .from("todos")
    .insert([newTodo])
    .select()
    .single();

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to add todo.",
    });
  } else {
    dispatch({ type: "ADD_TODO", payload: data });
  }
};

  // Update Todo
  const updateTodo = async (id, updates) => {
    const { data, error } = await supabase
      .from("todos")
      .update({
        ...updates,
        due_date: updates.dueDate,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update todo.",
      });
    } else {
      dispatch({ type: "UPDATE_TODO", payload: data });
    }
  };

  // Toggle Completed
  const toggleTodo = async (id) => {
    const todo = state.todos.find((t) => t.id === id);
    if (!todo) return;
  
    const { error } = await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .eq("id", id);
  
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to toggle todo.",
      });
    } else {
      dispatch({ type: "TOGGLE_TODO", payload: id });
    }
  };
  

  // Delete Todo
  const deleteTodo = async (id) => {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete todo.",
      });
    } else {
      dispatch({ type: "DELETE_TODO", payload: id });
    }
  };

  // Filtered and Sorted Todos
  const getFilteredTodos = () => {
    const { status, priority, category, search } = state.filters;

    return state.todos
      .filter((todo) => {
        if (status === "active" && todo.completed) return false;
        if (status === "completed" && !todo.completed) return false;
        if (priority !== "all" && todo.priority !== priority) return false;
        if (category !== "all" && todo.category !== category) return false;
        if (search && !todo.title.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        switch (state.sortBy) {
          case "date":
            return new Date(b.created_at) - new Date(a.created_at);
          case "priority": {
            const priorityWeight = { high: 3, medium: 2, low: 1 };
            return priorityWeight[b.priority] - priorityWeight[a.priority];
          }
          case "alphabetical":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  };

  const setFilters = (filters) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  };

  const setSort = (sortBy) => {
    dispatch({ type: "SET_SORT", payload: sortBy });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        categories: state.categories,
        filters: state.filters,
        sortBy: state.sortBy,
        filteredTodos: getFilteredTodos(),
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        setFilters,
        setSort,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// Hook to use Todo Context
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used inside a TodoProvider");
  }
  return context;
};
