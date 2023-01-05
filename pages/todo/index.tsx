
import { useEffect } from 'react';
import useStore from "../store";
import { useRouter } from "next/router";


const Todo = () => {
    const router = useRouter();
    const store = useStore();

    useEffect(() => {

		store.loadTodos();

    }, [])

    const handleDelete = (id: string) => (event: React.MouseEvent) => store.deleteTodo(id);

    const handleView = (id: string) => router.push('/todo/'+id);
    
    return ( 
        <div className='container mx-auto'>
            <div className="relative flex flex-col shadow-lg w-full min-w-0 break-words mb-6">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow">
                        <h3 className="font-semibold text-lg p-4 m-4">
                            Todo Table
                        </h3>
                        <button onClick={() => store.loadTodos()}>Load todos</button>
                    </div>
                </div>
                <div className="block bg-transparent m-4 p-4">
                    <table className="w-full">
                        <thead>
                            <tr className="border border-solid border-l-0 border-r-0">
                                <th className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">Todo</th>
                                <th className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">Description</th>
                                <th className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">Completed</th>
                                <th className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                store?.todos.map((todo:any) => {
                                    return(
                                        <tr key={todo._id}>
                                            <td className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">{todo.title}</td>
                                            <td className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">{todo.description}</td>
                                            <td className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">{todo.status.toString()}</td>
                                            <td className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">
                                                <div className="inline-flex">
                                                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 mx-1 px-4 rounded-l" onClick={() => handleView(todo._id)}>
                                                        Edit
                                                    </button>
                                                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 mx-1 px-4 rounded-r" onClick={handleDelete(todo._id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Todo;