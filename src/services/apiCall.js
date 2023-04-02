import Axios from 'axios';

const BASE_API_URL = 'http://localhost:3001';

const apiCall = Axios.create({
  baseURL: BASE_API_URL,
})

export default apiCall;