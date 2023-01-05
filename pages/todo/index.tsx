
import { useEffect } from 'react';
import useStore from "../store";
import Link from 'next/link';
import { useRouter } from "next/router";


const Todo = () => {
    const router = useRouter();
    const { loadTodos, deleteTodo, todos} = useStore(state => state)

    useEffect(() => {
		loadTodos();
    }, [])

    const handleDelete = (id: string) => (event: React.MouseEvent) => deleteTodo(id);

    const handleView = (id: string) => router.push('/todo/'+id);
    
    return ( 
        <div className='container mx-auto mt-32'>
            <div className="relative flex flex-col shadow-lg w-full min-w-0 break-words mb-6">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow">
                        <h3 className="font-semibold text-lg p-4 m-4 inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out">
                            <Link href="/todo/add">Add todo</Link>
                        </h3>
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
                                todos.length === 0 ?  
                                    (<tr><td className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">There's is no data to display.</td></tr>) 
                                    : todos.map((todo:any) => {
                                    return(
                                        <tr key={todo._id}>
                                            <td className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">{todo.title}</td>
                                            <td className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">{todo.description}</td>
                                            <td className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">{todo.status.toString()}</td>
                                            <td className="text-md px-6 py-3 align-middle whitespace-nowrap font-semibold text-left">
                                                <div className="inline-flex">
                                                    <button className="bg-green-500 hover:bg-green-600 text-gray-800 font-bold py-2 mx-1 px-4 rounded-l" onClick={() => handleView(todo._id)}>
                                                        Edit
                                                    </button>
                                                    <button className="bg-red-500 hover:bg-red-700 text-slate-50 font-bold py-2 mx-1 px-4 rounded-r" onClick={handleDelete(todo._id)}>
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