import axios from 'axios';
import Swal from 'sweetalert2';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      if (config.headers) {
        config.headers.Authorization = 'Bearer ' + token;
      }
    }
    return config;
  },
  async (err) => {
    await Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    void Swal.fire({
      title: `${err?.response?.data?.error?.message}`,
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return await Promise.reject(err);
  }
);

export default axiosClient;