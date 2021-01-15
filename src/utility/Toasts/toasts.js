import classes from "./toasts.module.scss";
import { toast, Zoom } from "react-toastify";

export const showSuccessToast = (message) => {
  toast(message, {
    hideProgressBar: true,
    transition: Zoom,
    className: `${classes.toastSuccess}`,
    position: "bottom-right",
  });
};

export const showFailToast = (message) => {
  toast(message, {
    hideProgressBar: true,
    transition: Zoom,
    className: `${classes.toastFail}`,
    position: "bottom-right",
    autoClose: 10000,
  });
};
