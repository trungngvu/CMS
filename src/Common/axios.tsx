import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sunroad.vn/api/',
});

export default instance;
