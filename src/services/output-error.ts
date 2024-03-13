import { isAxiosError } from "axios";
import { getToastify, ToastifyEnum } from "@/services/toastify";

export function outputError(e: Error | unknown) {
  if (isAxiosError(e) && e.response?.data?.message) {
    getToastify(e.response?.data?.message, ToastifyEnum.ERROR, 5000);
  } else {
    getToastify("Unknown error", ToastifyEnum.ERROR, 3000);
  }
}
