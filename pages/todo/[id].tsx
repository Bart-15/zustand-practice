import {useEffect} from 'react';
import { useRouter } from 'next/router'
import useStore from "../store";


const SingleTodo = () => {
    const router = useRouter();
    const store = useStore();
    const { id } = router.query;

    useEffect(() => {
        if(id) {
            store.viewTodo(id.toString());
        }
    }, []);

    
    return ( 
        <div className="container mx-auto flex flex-col items-center mt-32">
            <div className="block max-w-sm w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                {store.loading ? (
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Loading...</h5>
                ) : (
                <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{store.todo.title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Description: {store.todo.description}</p>
                </div>
                )}
            </div>
        </div>
    );
}
 
export default SingleTodo;