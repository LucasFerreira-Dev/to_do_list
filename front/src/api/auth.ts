// api/auth.ts
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const authAPI = {
    login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
    });
    return response.data;
},

register: async (username: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
    });
    return response.data;
}
}