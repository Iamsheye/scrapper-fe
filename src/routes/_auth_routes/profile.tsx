import { useState } from "react";
import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import ChangePassword from "@/components/change-password";
import ProfileForm from "@/components/profile-form";

export const Route = createFileRoute("/_auth_routes/profile")({
  component: Profile,
});

function Profile() {
  const { history } = useRouter();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <Helmet>
        <title>Profile | Scrapper</title>
      </Helmet>

      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => history.go(-1)}
          className="mb-4 text-[0.875rem] text-primary underline md:text-[1.25rem]"
        >
          back
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("SCRAPPER_REFRESH_TOKEN");
            localStorage.removeItem("SCRAPPER_TOKEN");
            navigate({
              to: "/login",
              replace: true,
            });
          }}
          className="mb-4 text-[0.875rem] text-primary underline md:text-[1.25rem]"
        >
          logout
        </button>
      </div>

      <div className="mb-12 flex items-center gap-4 md:gap-12">
        <button
          onClick={() => setActiveTab(0)}
          className={`text-[0.875rem] md:text-[1.25rem] ${activeTab === 0 ? "text-form_text" : "text-primary underline"}`}
        >
          profile
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`text-[0.875rem] md:text-[1.25rem] ${activeTab === 1 ? "text-form_text" : "text-primary underline"}`}
        >
          change password
        </button>
      </div>

      {activeTab === 0 && <ProfileForm />}
      {activeTab === 1 && <ChangePassword />}
    </div>
  );
}
