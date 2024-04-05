import axios from "axios";

// const CancelToken = axios.CancelToken;
let cancel: any;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("authToken");

    config.headers.Authorization = "Bearer " + token;
    config.headers["Access-Control-Allow-Origin"] = "*";
    // config.headers["origin"] = process.env.origin;

    if (cancel) {
      cancel(); // cancel request
    }

    // config.cancelToken = new CancelToken(function executor(cancelor) {
    //   cancel = cancelor;
    // });

    return config;
  },
  function (error) {
    console.log("axios request error");
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async function (response) {
    return response;
  },
  function (error) {
    console.log("axios response error", error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
