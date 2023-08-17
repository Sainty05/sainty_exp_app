import Axios from 'axios';
const axiosBaseURL = Axios.create({
    baseURL: 'https://exp-server-q45r.onrender.com/api'
    // baseURL: 'http://localhost:5000/api'
});
export default axiosBaseURL