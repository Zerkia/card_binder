import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    data: T[]
}

const axiosInstance = axios.create({
  baseURL: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) =>
    axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data.data);

  getById = (id?: number) =>
    axiosInstance
    .get<FetchResponse<T>>(this.endpoint, {
      params: {
        id: id
      }
    })
    .then((res) => res.data.data[0])
}


export default ApiClient;