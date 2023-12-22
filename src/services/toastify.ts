import { toast } from "react-toastify";

export enum ToastifyEnum {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

export const getToastify = (
  message: string,
  type: ToastifyEnum = ToastifyEnum.SUCCESS,
  delay: number | false = 3000,
) => {
  toast[type](message, {
    position: "top-right",
    autoClose: delay,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
