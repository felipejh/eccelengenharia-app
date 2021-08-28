import axios from 'axios';
// import { API_URL } from 'react-native-dotenv';

const api = axios.create({
  baseURL: 'http://143.244.187.118:8080',
});

export default api;
