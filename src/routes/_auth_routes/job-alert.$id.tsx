import { useState } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useHookForm } from "@/hooks/useHookForm";
import Input from "@/components/input";
import ProfileButton from "@/components/profile-button";
import TagInput from "@/components/tag-input";
import { getJobAlert, editJobAlert } from "@/network/jobs";
import { editJobAlertSchema } from "@/schemas/job_alert";
import { toastError } from "@/utils";
import CreateSuccessIcon from "@/assets/create-job_alert-success.svg?react";

export const Route = createFileRoute("/_auth_routes/job-alert/$id")({
  component: EditJobAlert,
  loader: async ({ params }) => {
    const jobAlert = await getJobAlert(params.id);

    return {
      jobAlert,
    };
  },
});

function EditJobAlert() {
  const { jobAlert } = Route.useLoaderData();
  const { id } = Route.useParams();

  const { history } = useRouter();
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useHookForm(editJobAlertSchema, {
    name: jobAlert.name,
    description: jobAlert.description,
    includeWords: jobAlert.includeWords,
    omitWords: jobAlert.omitWords,
  });

  const watchIncludeWords = watch("includeWords");
  const watchOmitWords = watch("omitWords");

  const saveJobAlert = handleSubmit(async (data) => {
    const toastId = toast.loading("saving job alert");
    try {
      await editJobAlert(id, data);

      toast.dismiss(toastId);
      toast.success("saved job alert");

      setTimeout(() => {
        setShowSuccessScreen(true);
      }, 1250);
    } catch (error) {
      toast.dismiss(toastId);
      toastError(error);
    }
  });

  return (
    <div>
      <section className="mb-3 flex items-center justify-between">
        <ProfileButton />
      </section>

      <button
        onClick={() => history.go(-1)}
        className="text-[0.875rem] text-primary underline md:text-[1.25rem]"
      >
        back
      </button>

      <div className="flex justify-center">
        {showSuccessScreen ? (
          <div className="empty-job_alert flex flex-col items-center justify-center gap-8 md:gap-10">
            <CreateSuccessIcon />
            <p className="text-center text-[1.5rem] font-semibold text-form_text md:text-[2rem]">
              alert edited successfully
            </p>

            <Link
              to="/dashboard"
              className="text-[0.875rem] text-primary underline md:text-[1.25rem]"
            >
              go home
            </Link>
          </div>
        ) : (
          <form
            onSubmit={saveJobAlert}
            className="flex max-w-[596px] grow flex-col gap-8 md:gap-10"
          >
            <h1 className="text-center text-[2rem] font-bold text-primary md:text-[3rem]">
              edit job alert
            </h1>

            <div className="flex flex-col gap-4 md:gap-6">
              <div>
                <Input
                  name="name"
                  placeholder="name"
                  register={register}
                  errors={errors}
                />
              </div>
              <div>
                <Input
                  name="description"
                  placeholder="description"
                  register={register}
                  errors={errors}
                />
              </div>
              <div>
                <TagInput
                  name="include"
                  placeholder="include words like"
                  tagList={watchIncludeWords || []}
                  onClearAll={() => setValue("includeWords", [])}
                  onEnter={(text) => {
                    const existingIncludeWords = watchIncludeWords || [];
                    setValue("includeWords", [...existingIncludeWords, text]);
                  }}
                  onTagRemove={(word) => {
                    setValue(
                      "includeWords",
                      watchIncludeWords?.filter((txt) => txt !== word),
                    );
                  }}
                />
              </div>
              <div>
                <TagInput
                  name="omit"
                  placeholder="omit words like"
                  tagList={watchOmitWords || []}
                  onClearAll={() => setValue("omitWords", [])}
                  onEnter={(text) => {
                    const existingOmitWords = watchOmitWords || [];
                    setValue("omitWords", [...existingOmitWords, text]);
                  }}
                  onTagRemove={(word) => {
                    setValue(
                      "omitWords",
                      watchOmitWords?.filter((txt) => txt !== word),
                    );
                  }}
                />
              </div>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="h-[56px] w-full rounded-[40px] bg-primary text-[1rem] font-semibold text-[#FAFAFAFA] md:h-[88px] md:text-[1.5rem] md:font-bold"
            >
              save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
