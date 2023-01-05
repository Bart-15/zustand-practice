import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from "react-hook-form";
import { TTodoFormInputs } from "../types/todo.types";
import useStore from '../store';

const AddTodo = () => {
    const store = useStore();
    const router = useRouter();

    const initVal = {
        title:'',
        description:''
    };

    const { register, formState, reset, formState: { errors }, handleSubmit } = useForm<TTodoFormInputs>({defaultValues: initVal});

    useEffect(() => {

        if (formState.isSubmitSuccessful) {
            reset({ title: '', description:'' });
        }
        
    }, [formState, reset]);
    


    const onSubmit: SubmitHandler<TTodoFormInputs> = async(formVal) => {
        /**
         * If you want to add other validation place here
        */
        store.addTodo(formVal, router);
    }
    
    return ( 
        <div className="container mx-auto flex flex-col items-center mt-32">
            <div className="block max-w-sm w-3/4 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h2 className="font-semibold">Add Todo</h2>
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
 
export default AddTodo;