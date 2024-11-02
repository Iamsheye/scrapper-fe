import { useEffect, useState } from "react";
import {
  createFileRoute,
  Link,
  useLoaderData,
  useRouter,
} from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import Input from "@/components/input";
import TagInput from "@/components/tag-input";
import ProfileButton from "@/components/profile-button";
import { useHookForm } from "@/hooks/useHookForm";
import { createJobAlertSchema } from "@/schemas/job_alert";
import { createJobAlert } from "@/network/jobs";
import { toastError } from "@/utils";
import CreateSuccessIcon from "@/assets/create-job_alert-success.svg?react";

export const Route = createFileRoute("/_auth_routes/create-alert")({
  component: CreateAlert,
});

function CreateAlert() {
  const { history } = useRouter();
  const { user } = useLoaderData({
    from: "/_auth_routes",
  });
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  useEffect(() => {
    if (!user.isVerified) {
      toast.error(`Please verify your account to create job alerts`);
    }
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useHookForm(createJobAlertSchema, {
    name: "",
    search: "",
    description: "",
    includeWords: ["remote"],
    omitWords: [],
  });

  const watchIncludeWords = watch("includeWords");
  const watchOmitWords = watch("omitWords");

  const submitJobAlert = handleSubmit(async (data) => {
    const toastId = toast.loading("creating job alert");
    try {
      await createJobAlert(data);

      toast.dismiss(toastId);
      toast.success("created job alert");

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
      <Helmet>
        <title>Create Job Alert | Scrapper</title>
      </Helmet>

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
              alert created successfully
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
            onSubmit={submitJobAlert}
            className="flex max-w-[596px] grow flex-col gap-8 md:gap-10"
          >
            <h1 className="text-center text-[2rem] font-bold text-primary md:text-[3rem]">
              create job alert
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
                  name="search"
                  placeholder="search"
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
              create alert
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CreateAlert;
