import axios from 'axios';
import { urlsServices } from '../configs/urlsConfigAppBase';

const getConfig = (type: string) => {

    const configPub = {
        headers: {                  
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization", 
            "Access-Control-Allow-Methods": "*" ,
            "Content-Type": "application/json;charset=UTF-8" ,                 
        },
    };
    
    const configPriv = {    
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Authorization", 
            "Access-Control-Allow-Methods": "*" ,
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
        }
    };

    if(type === "priv"){
        return configPriv;
    } 
           
    return configPub;
}

const api = axios.create({
    baseURL: urlsServices.BACKENDWS,
    withCredentials: true,
    xsrfCookieName: "csrf-token",
    xsrfHeaderName: 'X-CSRF-TOKEN',
});

export const useApi = () => ({

    validateToken: async (token: string) => {
        const response = await api.post('/auth/validate', {token}, getConfig("priv"));
        return response.data;
    },
    signin: async (cpf: string, password: string) => {
        const response = await api.post('auth/login', {cpf, password});
        return response.data;
    },
    logout: async (token: string) => {
        const response = await api.post('/auth/logout', {token}, getConfig("pub"));
        return response.data;
    },
    subscribe: async (values: any) => {

    },
    
})