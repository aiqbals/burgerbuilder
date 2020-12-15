import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-b7e9a.firebaseio.com/'
});

export default instance;