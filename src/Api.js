import axios from "axios";
import { toast } from "react-toastify";

const ApiConfig = axios.create();

ApiConfig.interceptors.request.use(
  config => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json',
      };
    }
    return config;
  },
  error => Promise.reject(error)
);

ApiConfig.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config;
    const isAdminRoute = window.location.pathname.startsWith("/Admin");

    if (error.response?.status === 403 && !config._retry) {
      config._retry = true;

      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token) {
        try {
          const rs = await ApiConfig.post(`takbon.biz:3402/Admin/login`);
          const { token, refreshToken } = rs.data;
          localStorage.setItem("access_token", token);
          localStorage.setItem("refresh_token", refreshToken);
          config.headers['Authorization'] = `Bearer ${token}`;
          return ApiConfig(config);
        } catch (err) {
          toast.error("دسترسی منقضی شده. لطفاً دوباره وارد شوید.");
          localStorage.clear();
          window.location.replace("/Admin/login");
          return Promise.reject(err);
        }
      } else {
        toast.error("لطفاً دوباره وارد شوید.");
        localStorage.clear();
        window.location.replace("/Admin/login");
        return Promise.reject(error);
      }
    }

    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.replace("/Admin/login");
    }

    return Promise.reject(error);
  }
);

export default ApiConfig;
