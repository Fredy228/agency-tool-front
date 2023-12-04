import axios from "axios";

axios.defaults.baseURL = process.env.SERVER_URL;

export const setAuthHeader = (token: string): void => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default axios;

// try {
//     data = api
// } catch (e) {
//     handlerError (e)
// }
