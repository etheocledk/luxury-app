import { toast, ToastOptions, ToastContent } from "react-toastify";

const useToast = () => {
  return (
    message: ToastContent,
    type: "success" | "error" | "info" | "warning" = "info",
    options: ToastOptions = {}
  ) => {
    const defaultOptions: ToastOptions = {
      type: type,
      autoClose: 3000,
      closeOnClick: true,
      position: "top-right",
      ...options,
    };

    return toast(message, defaultOptions); 
  };
};

export default useToast;
