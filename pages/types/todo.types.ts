export type TTodos = {
  _id?: string;
  title?: string;
  description?: string;
  status?: boolean;
};

export type TTodoFormInputs = {
  title: string;
  description: string;
  status?: boolean;
};

export type TodoStore = {
  todos: TTodos[];
  todo: TTodos;
  loading: boolean;
  addTodo: (formData: TTodoFormInputs, router: any) => void;
  getTodos: (todos: TTodos[]) => void;
  deleteTodo: (id: string) => void;
  loadTodos: () => void;
  viewTodo: (data: TTodos) => void;
  updateTodo: (id: string, formData: TTodoFormInputs, router: any) => void;
};
