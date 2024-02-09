import axios, {
    AxiosResponse,
    AxiosRequestConfig
} from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    params: {}
    //baseURL: process.env.HOST
})


axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
        const token = localStorage.getItem("token");
        if (!token || !config.headers) return config;
        config.headers.Authorization = `Bearer ${token}`
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });


axios.interceptors.response.use(
    (response: AxiosResponse) => {
        switch (response.status) {
            case 400:
                return response;
            case 401:
                return response;
            default:
                return response;
        }
        
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;