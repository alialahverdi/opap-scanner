import axios from 'axios';
import { baseUrl } from './baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

const getUserInfo = async () => {
    const value = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(value);
    return userInfo;
}

axiosInstance.interceptors.request.use(async config => {
    const userInfo = await getUserInfo();
    if (userInfo != null && userInfo.token != null) {
        config.headers['Authorization'] = userInfo.token;
    }
    return config;
});

axiosInstance.interceptors.response.use(res => {
    return res.data;
}, (error) => {
    const { data } = error.response;
    return Promise.reject(data);
});


export default axiosInstance;