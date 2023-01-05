import { TTodos } from "../../types/todo.types";
import axiosPublic from "../../utils/axios";
import useStore from '../index';


export const loadTodos = async() => {
    const {data} =  await axiosPublic.get('/todos');

    return data.result;
}