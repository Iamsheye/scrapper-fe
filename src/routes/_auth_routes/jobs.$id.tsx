import { useEffect } from "react";
import {
  Await,
  createFileRoute,
  defer,
  useNavigate,
} from "@tanstack/react-router";
import { z } from "zod";
import { useDebounceValue } from "usehooks-ts";
import { getJobAlert, getJobAlertJobs } from "@/network/jobs";
import { formatDate } from "@/utils";
import EmptyJobAlertIcon from "@/assets/empty-job-alert.svg?react";

const JobsParamsSchema = z.object({
  page: z.number().catch(1),
  search: z.string().catch(""),
});

export const Route = createFileRoute("/_auth_routes/jobs/$id")({
  component: Jobs,
  validateSearch: JobsParamsSchema,
  loaderDeps: ({ search: { page, search } }) => ({ page, search }),
  loader: async ({ params, deps: { page, search } }) => {
    const jobInfo = await getJobAlert(params.id);

    const jobsRes = getJobAlertJobs(params.id, {
      page,
      search,
      perPage: 24,
    });

    return {
      jobsRes: defer(jobsRes),
      jobInfo,
    };
  },
});

function Jobs() {
  const navigate = useNavigate();
  const { page, search } = Route.useSearch();
  const { jobsRes, jobInfo } = Route.useLoaderData();

  const [debouncedValue, setValue] = useDebounceValue(search, 800);

  useEffect(() => {
    navigate({
      // @ts-ignore
      search: (prev) => ({ ...prev, search: debouncedValue }),
      replace: true,
    });
  }, [debouncedValue]);

  return (
    <div>
      <div className="flex items-center gap-6 lg:gap-8">
        <button
          onClick={() => history.go(-1)}
          className="shrink-0 text-[0.875rem] text-primary underline md:text-[1.25rem]"
        >
          back
        </button>
        <div className="flex flex-1 justify-center">
          <div className="">
            <h1 className="text-center text-[2rem] font-bold text-primary md:text-[3rem]">
              {jobInfo.name}
            </h1>

            <p className="text-center text-[1.25rem] text-form_text">
              {jobInfo.search}
            </p>
          </div>
        </div>
      </div>

      <div className="my-6 flex justify-between gap-6">
        <input
          defaultValue={search}
          placeholder="search"
          onChange={(e) => setValue(e.currentTarget.value)}
          className="h-[44px] w-full rounded-[24px] bg-form p-4 text-[0.875rem] font-semibold text-primary focus-visible:outline-form_text md:w-80 md:rounded-[40px] lg:w-96"
        />
      </div>

      <Await promise={jobsRes} fallback={<></>}>
        {(data) => {
          const { jobs, metadata } = data;

          return (
            <>
              {jobs.length < 1 ? (
                <section className="empty-job flex items-center justify-center">
                  <div>
                    <EmptyJobAlertIcon className="mb-8 h-[154px] w-[154px] md:h-[200px] md:w-[200px]" />
                    <p className="text-center text-[1.5rem] font-semibold text-form_text md:text-[2rem]">
                      no job(s) found
                    </p>
                  </div>
                </section>
              ) : (
                <section className="my-8 flex flex-wrap gap-2 lg:gap-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex w-[calc(50%_-_4px)] flex-col justify-between rounded-[32px] bg-form p-6 lg:w-[calc(33%_-_8px)] lg:rounded-[40px] lg:p-8"
                    >
                      <div className="flex flex-col items-start gap-2">
                        <h2
                          className="text-[1rem] font-semibold text-primary lg:text-[1.25rem]"
                          style={{ overflowWrap: "anywhere" }}
                        >
                          {job.title}
                        </h2>
                        <p className="inline-block rounded-[40px] border border-primary p-1 text-[0.75rem] lg:p-1.5 lg:text-[0.875rem]">
                          {job.hostSite}
                        </p>
                        <p className="text-[0.75rem] text-form_text lg:text-[0.875rem]">
                          {formatDate(job.createdAt)}
                        </p>
                      </div>

                      <a
                        href={job.link}
                        className="mt-8 text-[0.875rem] text-primary underline lg:mt-4 lg:text-[1.25rem]"
                      >
                        link to job
                      </a>
                    </div>
                  ))}
                </section>
              )}
            </>
          );
        }}
      </Await>
    </div>
  );
}
