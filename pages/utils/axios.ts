// Modified axios;

import axios, {AxiosInstance} from "axios";

const BASE_API = "http://localhost:5000/api/v1/";

const axiosPublic: AxiosInstance = axios.create({
  baseURL: BASE_API,
});

export default axiosPublic;
