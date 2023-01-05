import create from 'zustand';
import { TodoStore, TTodos } from '../types/todo.types';
import axiosPublic from '../utils/axios';

const useStore = create<TodoStore>(
    (set, get): TodoStore => ({
        todos:[],
        todo:{},
        loading:false,

        getTodos(todos: TTodos[]) {
            set((state) => ({
                ...state,
                todos
            }))
        },

        loadTodos: async() => {
            try {
                set({ loading: true });
                const { data } = await axiosPublic.get('/todos');

                set({ loading: false, todos: data.result });
            }catch(e) {
                console.log(e)
                set({ loading: false, todos: [] })
            }
        },

        deleteTodo: async(id: string) => {
            try {
                set({ loading: true})
                await axiosPublic.delete('/todos/' + id);
                set((state) => ({
                    ...state,
                    todos: state.todos.filter(todo => todo._id !== id),
                    loading: false
                }))

                get().loadTodos();
                
            }catch(e) {
                console.log(e)
            } 
        },

        viewTodo: async(id: string) => {
            try{
                set({ loading: true });
                const { data } = await axiosPublic.get('/todos/'+id);
                set((state) => ({
                    ...state,
                    todo: data,
                    loading: false
                }))
            }catch(e) {

            }
        }

    })
)

export default useStore;