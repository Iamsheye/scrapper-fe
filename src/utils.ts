import toast from "react-hot-toast";

export const toastError = (err: unknown) => {
  // @ts-ignore
  const message = err.response?.data?.message || "An error occured";
  toast.error(message, { duration: 7 * 1000 });
};

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const day = date.getDate();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
