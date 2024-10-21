import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllJobAlerts } from "@/network/jobs";
import UserIcon from "@/assets/user.svg?react";
import EmptyJobAlertIcon from "@/assets/empty-job-alert.svg?react";

export const Route = createFileRoute("/_auth_routes/dashboard")({
  component: Dashboard,
  loader: async () => {
    const jobAlerts = await getAllJobAlerts();

    return {
      jobAlerts,
    };
  },
});

function Dashboard() {
  const { jobAlerts } = Route.useLoaderData();

  return (
    <div>
      <section className="mb-3 flex items-center justify-between">
        <button className="flex h-8 items-center gap-1.5 rounded-[40px] border border-primary p-2 md:h-10">
          <UserIcon />
          <span className="text-[0.875rem] font-bold md:text-[1rem]">
            hi, {"sheye"}
          </span>
        </button>
      </section>

      <Link
        to="/create-alert"
        className="text-[0.875rem] text-primary underline md:text-[1.25rem]"
      >
        create job alert
      </Link>

      {jobAlerts.length < 1 ? (
        <section className="empty-job_alert flex items-center justify-center">
          <div>
            <EmptyJobAlertIcon className="mb-8 h-[154px] w-[154px] md:h-[200px] md:w-[200px]" />
            <p className="text-center text-[1.5rem] font-semibold text-form_text md:text-[2rem]">
              no job alerts yet
            </p>
          </div>
        </section>
      ) : (
        <section className="">{jobAlerts.map((item) => item.name)}</section>
      )}
    </div>
  );
}
