import axios from "axios";
import { get, set, remove } from "local-storage";
import { getToastify, ToastifyEnum } from "@/services/toastify";

const baseURL = process.env.SERVER_URL!;

axios.defaults.baseURL = baseURL;

const $api = axios.create({ withCredentials: true, baseURL });

$api.interceptors.request.use((config) => {
  const token = get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.get<{ accessToken: string }>(
          "/api/auth/refresh",
          {
            withCredentials: true,
          },
        );
        set("token", data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        remove("token");
        getToastify(
          "Your session has expired. Reload the page",
          ToastifyEnum.ERROR,
        );
        // document.location.reload();
      }
    }
    throw error;
  },
);

export default $api;
