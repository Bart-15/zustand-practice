import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler, set } from "react-hook-form";
import { TTodoFormInputs } from "../types/todo.types";
import axiosPublic from '../utils/axios';
import useStore from '../store';


const SingleTodo = () => {
    
    const router = useRouter();
    const store = useStore();
    const { id } = router.query;
    
    const { register, setValue, formState: { errors }, handleSubmit } = useForm<TTodoFormInputs>();
    
    useEffect(() => {
        if(!id) return;
        
        const fetchTodo = async() => {
            try {
                const { data } = await axiosPublic.get('/todos/' + id);
                store.viewTodo(data);
                setValue("title", data.title);
                setValue("description", data.description);
                setValue("status", data.status);
            } catch(e) {    
                console.log(e); 
            }
        }

        fetchTodo();
    }, [id]);



    const onSubmit: SubmitHandler<TTodoFormInputs> = async(formVal) => {
        /**
         * If you want to add other validation place here
        */
        store.updateTodo(id!.toString(), formVal, router);
    }

    return ( 
        <div className="container mx-auto flex flex-col items-center mt-32">
            <div className="block max-w-sm w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h2 className="font-semibold">Update Todo</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label inline-block mb-2 text-gray-600 text-sm">Todo:</label>
                        <input
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="title"
                        {...register("title", { required: true })}
                        placeholder="Todo"
                        />
                        { errors.title && <span className="text-sm text-red-500">Title is required</span> }
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label inline-block mb-2 text-gray-600 text-sm">Description:</label>
                        <textarea className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="description"
                        rows={3}
                        placeholder="Description"
                        {...register("description", { required: true })}
                        />
                        { errors.description && <span className="text-sm text-red-500">Description is required</span> }
                    </div>
                    <div className="mb-2">
                    <div className="flex items-center">
                        <input 
                        id="status-checkbox" 
                        type="checkbox" 
                        value="" 
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                        {...register("status")}
                        />
                        <label htmlFor="status-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Completed</label>
                    </div>
                    </div>
                    <div className="mb-3">
                        <button
                        type="submit"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default SingleTodo;