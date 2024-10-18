import toast from "react-hot-toast";

export const toastError = (err: unknown) => {
  // @ts-ignore
  const message = err.response?.data?.message || "Login Failed";
  toast.error(message, { duration: 7 * 1000 });
};
