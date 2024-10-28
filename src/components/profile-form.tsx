import { useLoaderData } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { toastError } from "@/utils";
import Input from "./input";
import { sendMailVerification } from "@/network/user";

const ProfileForm = () => {
  const { user } = useLoaderData({
    from: "/_auth_routes",
  });

  const sendVerificationMail = async () => {
    const toastId = toast.loading("sending...");

    try {
      await sendMailVerification();
      toast.dismiss(toastId);
      toast.success("verification mail sent");
    } catch (error) {
      toast.dismiss(toastId);
      toastError(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-[596px] grow">
        <div className="flex flex-col gap-4 md:gap-6">
          <div>
            <Input disabled name="name" value={user.name} placeholder="name" />
          </div>
          <div className="relative">
            <Input
              disabled
              name="email"
              value={user.email}
              placeholder="email"
            />
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 gap-4 md:right-8">
              {user.googleId && (
                <div className="text-w flex items-center gap-1 rounded-[40px] bg-form_text px-2 py-1 text-[0.875rem] font-semibold text-white">
                  <img src="./google.png" alt="" />
                  <span>connected</span>
                </div>
              )}
              {!user.isVerified && (
                <button
                  className="text-[0.875rem] text-primary underline md:text-[1rem]"
                  onClick={sendVerificationMail}
                >
                  verify mail
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
