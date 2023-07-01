import axios from "axios";
import Cookies from 'js-cookie'
import getCookie from "./getCookie";



const baseURL = import.meta.env.VITE_APP_BASE_URL;

const requesttoken = await getCookie()
const token = await requesttoken
const Bearertoken = Cookies.get('BearerToken')
const Api = axios.create({
    baseURL: `${baseURL}/api`,
    withCredentials: true,
})


Api.defaults.headers.common['Authorization'] = `Bearer ${Bearertoken}`;
Api.defaults.headers.common['X-XSRF-TOKEN'] = token;

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