import Axios from 'axios';
const axiosBaseURL = Axios.create({
    baseURL: 'https://sainty-exp-server-05.vercel.app/'
});
export default axiosBaseURL