import Axios from 'axios';
const axiosBaseURL = Axios.create({
    baseURL: 'https://exp-server-q45r.onrender.com/api'
});
export default axiosBaseURL