import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.sunroad.vn/api/',
});

export default instance;
