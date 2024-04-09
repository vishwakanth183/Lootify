import axiosInstance from "./interceptor";

const hostUrl = "http://localhost:5000/";

class httpRoutingService {
  /** Get method Function which is used for get method */
  getMethod(url: string, queryParams?: any) {
    return axiosInstance.get(hostUrl + url, { params: queryParams });
  }
  /** Post method Function which is used for post method */
  postMethod(url: string, data: any, queryParams?: any) {
    return axiosInstance.post(hostUrl + url, data, {
      params: queryParams,
    });
  }
}
const HttpRoutingService = new httpRoutingService();
export default HttpRoutingService;
