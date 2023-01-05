export type TTodos = {
  _id?: string;
  title?: string;
  description?: string;
  status?: boolean;
};

export type TodoStore = {
  todos: TTodos[];
  todo: TTodos;
  loading: boolean;
  getTodos: (todos: TTodos[]) => void;
  deleteTodo: (id: string) => void;
  loadTodos: () => void;
  viewTodo:(id: string) => void;
};
