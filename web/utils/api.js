import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:1234/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

export default api
