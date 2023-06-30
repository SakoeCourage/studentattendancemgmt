import axios from "axios";
import Cookies from 'js-cookie'



const baseURL = import.meta.env.VITE_APP_BASE_URL;


const Bearertoken = Cookies.get('BearerToken')
const Api = axios.create({
    baseURL: `${baseURL}/api`,
    withCredentials: true,
})

Api.defaults.headers.common['Authorization'] = `Bearer ${Bearertoken}`;

Api.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error?.response?.status === 401 || error?.response?.status === 419) {
        Cookies.remove('BearerToken')
    } else if (error?.response?.status === 403) {
        alert('You don\'t enough priviledges to take this action contact admininstrator')
    } else {
        return Promise.reject(error);
    }
    console.log(error)
    return Promise.reject(error);
});

export default Api;