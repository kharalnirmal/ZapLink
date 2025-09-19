import axios from "axios";  

const API_BASE_URL = "https://zaplink-16hh.onrender.com"; // Replace with your backend URL

const api = axios.create({
    baseURL: API_BASE_URL,
   headers:{
    'Content-Type':'application/json'
   }
});

// WHY interceptor? Automatically add token to all requests

api.interceptors.request.use((config)=>{
const token = localStorage.getItem('token')
 if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

 const authApi = {
    register : (userData)=> api.post('/auth/register', userData),
    login : (userData)=> api.post('/auth/login', userData),
}

 const urlAPI = {
  createShortUrl: (originalUrl) => api.post('/urls/shorten', { originalUrl }),
  getUserUrls:    ()            => api.get('/urls/my-urls'),
  getUrlStats:    (urlCode)     => api.get(`/urls/stats/${urlCode}`),
};


export {api , authApi , urlAPI};