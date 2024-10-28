import { useState } from "react";
import toast from "react-hot-toast";
import { useHookForm } from "@/hooks/useHookForm";
import { changePasswordSchema } from "@/schemas";
import Input from "./input";
import { changePassword } from "@/network/user";
import { toastError } from "@/utils";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useHookForm(changePasswordSchema, {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const submitForm = handleSubmit(async (data) => {
    const toastId = toast.loading("changing password...");

    try {
      await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.dismiss(toastId);
      toast.success("password changed successfully");
      reset();
    } catch (error) {
      toast.dismiss(toastId);
      toastError(error);
    }
  });

  return (
    <div className="flex justify-center">
      <div className="max-w-[596px] grow">
        <form onSubmit={submitForm} className="flex flex-col gap-10 md:px-3">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="relative">
              <Input
                name="currentPassword"
                type="password"
                placeholder="Current Password"
                register={register}
                errors={errors}
                showPassword={showCurrentPassword}
                onToggleClick={() =>
                  setShowCurrentPassword(!showCurrentPassword)
                }
              />
            </div>
            <div className="relative">
              <Input
                name="newPassword"
                type="password"
                placeholder="New Password"
                register={register}
                errors={errors}
                showPassword={showNewPassword}
                onToggleClick={() => setShowNewPassword(!showNewPassword)}
              />
            </div>
            <div className="relative">
              <Input
                name="confirmNewPassword"
                type="password"
                placeholder="Confirm New Password"
                register={register}
                errors={errors}
                showPassword={showConfirmNewPassword}
                onToggleClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
              />
            </div>
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="h-[56px] w-full rounded-[40px] bg-primary text-[1rem] font-semibold text-[#FAFAFAFA] md:h-[88px] md:text-[1.5rem] md:font-bold"
          >
            change password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
