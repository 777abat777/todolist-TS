import axios, { AxiosError } from "axios"

const baseURL = 'http://127.0.0.1:8000/api/';
// const baseURL = 'https://777abat777.pythonanywhere.com/api/';

export const instanse = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const todoApi = {
    async getTodos() {
        try {
            const response = await (instanse.get(`todolists/`))
            return response
        } catch (error) {
            return error
        }
    },
    async addTodoList(title: string, owner: string | number) {
        const response = await (instanse.post(`todolists/`, { title }))
        return response
    },
    async deleteTodoList(id: number) {
        const response = await (instanse.delete(`todolists/${id}`))
        return response
    }

}