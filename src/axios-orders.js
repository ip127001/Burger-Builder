import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-2d64c.firebaseio.com/'
}); 

export default instance;