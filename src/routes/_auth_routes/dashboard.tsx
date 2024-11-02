import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import JobAlert from "@/components/job-alert";
import ProfileButton from "@/components/profile-button";
import DialogModal from "@/components/modal";
import { deleteJobAlert, getAllJobAlerts } from "@/network/jobs";
import { toastError } from "@/utils";
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
  const router = useRouter();

  const { jobAlerts } = Route.useLoaderData();
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const deleteAlert = async (id: string) => {
    const toastId = toast.loading("deleting job alert");
    try {
      await deleteJobAlert(id);

      toast.dismiss(toastId);
      toast.success("deleted job alert");
      setShowDeleteModal(null);
      router.invalidate();
    } catch (error) {
      toast.dismiss(toastId);
      toastError(error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Dashboard | Scrapper</title>
      </Helmet>

      <section className="mb-3 flex items-center justify-between">
        <ProfileButton />
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
        <section className="my-8 flex flex-wrap gap-2 lg:gap-4">
          {jobAlerts.map((item) => (
            <JobAlert alert={item} onDelete={(id) => setShowDeleteModal(id)} />
          ))}

          <DialogModal
            isOpen={!!showDeleteModal}
            onClose={() => setShowDeleteModal(null)}
            text="Are you sure you want to delete this job alert?"
            onYes={() => {
              if (!showDeleteModal) return;
              deleteAlert(showDeleteModal);
            }}
          />
        </section>
      )}
    </div>
  );
}
