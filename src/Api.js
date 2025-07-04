import axios from "axios";
// import { deleteAllCookies, getCookie } from "./helper";
import { toast } from "react-toastify";
const ApiConfig = axios.create();
// errorComposer will compose a handleGlobally function
// const errorComposer = async (error) => {

//   const originalRequest = error.config;
//   const statusCode = error.response ? error.response.status : null;
//   switch (statusCode) {
//     case 401:
//       localStorage.clear();
//       window.location.replace("/login");
//       break;
//     case 403:
//       if (!originalRequest._retry) {
//         originalRequest._retry = true;
//         try {


//         } catch (error) {

//         }
//         return ApiConfig(originalRequest);
//       }

//       break;
//     case 404:

//       break;
//   }
//   return Promise.reject(error);
// }



// Request interceptor for API calls
ApiConfig.interceptors.request.use(
  async config => {
    // let access_token = localStorage.getItem("access_token")
    // if (access_token) {
      config.headers = {
        'Authorization': localStorage.getItem("access_token"),
        'Accept': 'application/json'
      }
    // }
    return config;
  },
  error => {
    Promise.reject(error)
  });


// Response interceptor for API calls

ApiConfig.interceptors.response.use((response) => {
  return response
}, async (error) => {
  const config = error.config;
 
  if (error.response && error.response.status === 403 && !config._retry) {
    config._retry = true;

    // deleteAllCookies();
    localStorage.clear()
    toast.error("خطا احراز هویت");
    window.location.replace("/Admin/login")
    // try {
    //   const refresh_token = localStorage.getItem("refresh_token");
    //   if (refresh_token) {
    //     const rs = await ApiConfig.post(process.env.REACT_APP_API_URL + "/refreshToken?refreshToken="+refresh_token, {refreshToken:refresh_token}, {
    //       headers: { "x-refresh-token": refresh_token }
    //     });
    //     const { refreshToken, token } = rs.data;
    //     localStorage.setItem("access_token", token);
    //     localStorage.setItem("refresh_token", refreshToken)
    //     axios.defaults.headers.common['x-access-token'] = token;
    //   } else {
    //     // localStorage.clear();
    //     // window.location.replace("/login");
    //   }
    //   return ApiConfig(config);
    // } catch (err) {
    //   return Promise.reject(err)
    // }
  }else if (error.response && error.response.status === 401) {
    localStorage.clear();
    window.location.replace("/login");
    return Promise.reject(error)
  }
  //handle global error
  
  return Promise.reject(error)
});

export default ApiConfig; 