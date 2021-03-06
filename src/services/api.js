import axios from 'axios'

const API_ROOT = `http://localhost:62074`

const handleErrors = async (error) => {

    let result = {}
    const data = error && error.response && error.response.data
    const status = error && error.response && error.response.status

    result = {
        status: status,
        data: data,
        error: true
    }
    
    return result
}

const handleResponse = res => {
    return res
}

const beforeRequest = async (config) => {
    return config
}

const createApi = () => {
    const api = axios.create({
        baseURL: API_ROOT,
        timeout: 30000,
        headers: { 'Authorization': 'Bearer ' + JSON.parse(JSON.stringify(localStorage.getItem('userToken'))) }
    })
    api.interceptors.request.use(beforeRequest)

    api.interceptors.response.use(function (response) {
        return response
    })
    
    return api
}
const requests = {
    get: url =>
        createApi()
            .get(`${API_ROOT}${url}`)
            .then(handleResponse)
            .catch(handleErrors),
    post: (url, data) =>
        createApi()
            .post(`${API_ROOT}${url}`, data)
            .then(handleResponse)
            .catch(handleErrors),
    // .then(responseBody)
    put: (url, data) =>
        createApi()
            .put(`${API_ROOT}${url}`, data)
            .then(handleResponse)
            .catch(handleErrors),
    delete: (url) =>
        createApi()
            .delete(`${API_ROOT}${url}`)
            .then(handleResponse)
            .catch(handleErrors),
}

const Auth = {
    login: (username, password) =>
        requests.post('/api/account/login', { username, password }),
    validatePin: (userId, pin) =>
        requests.post('/v1/Authentication/securitycode', { UserId: userId, SecurityCode: pin }),
    createPin: (userId, pin) =>
        requests.post('/v1/Authentication/securitycode/put', { UserId: userId, SecurityCode: pin })
}

const Places ={
    region: () => requests.get('/api/regions/get-regions'),
    provinces: () => requests.get('/api/regions/get-provinces'),
    municipalities: () => requests.get('/api/regions/get-municipalities'),
    barangays: () => requests.get('/api/regions/get-barangays')
}


export default {
    Auth, Places
}
