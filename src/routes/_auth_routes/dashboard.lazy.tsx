import { getAllJobAlerts } from "@/network/jobs";
import { createLazyFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const Route = createLazyFileRoute("/_auth_routes/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard.</p>

      <button
        onClick={async () => {
          const toastId = toast.loading("Fetching all job alerts...");
          try {
            const jobAlerts = await getAllJobAlerts();

            toast.dismiss(toastId);
            toast.success("Successful");
            console.log(jobAlerts.data);
          } catch (error) {
            toast.dismiss(toastId);
            toast.error("An error occured");
          }
        }}
      >
        Get Job Alerts
      </button>
    </div>
  );
}
