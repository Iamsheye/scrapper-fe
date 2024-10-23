import { Link } from "@tanstack/react-router";
import { IJobAlert } from "@/types";

type IJobAlertProps = {
  alert: IJobAlert;
  onDelete: (id: string) => void;
};

const JobAlert = ({ alert, onDelete }: IJobAlertProps) => {
  return (
    <div className="flex w-[calc(50%_-_4px)] flex-col justify-between rounded-[32px] bg-form p-6 md:rounded-[40px] md:p-8 lg:w-[calc(33%_-_8px)]">
      <Link
        to="/jobs/$id"
        params={{ id: alert.id }}
        search={{ page: 1, search: "" }}
        className="mb-8 flex w-full flex-col gap-2.5 text-left lg:gap-4"
      >
        <>
          <h2 className="text-[1rem] font-semibold text-primary lg:text-[1.25rem]">
            {alert.name}
          </h2>
          <p className="text-[0.875rem] text-slate-600 lg:text-[1rem]">
            {alert.description}
          </p>
        </>
      </Link>

      <div className="flex justify-between">
        <Link
          to="/job-alert/$id"
          params={{ id: alert.id }}
          className="block text-[0.875rem] text-primary underline md:text-[1.25rem]"
        >
          edit
        </Link>

        <button
          onClick={() => onDelete(alert.id)}
          className="block text-[0.875rem] text-primary underline md:text-[1.25rem]"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default JobAlert;
