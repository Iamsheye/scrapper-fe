import toast from "react-hot-toast";

const getDayOrdinal = (day: number): string => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const toastError = (err: unknown) => {
  // @ts-ignore
  const message = err.response?.data?.message || "Login Failed";
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
