import { Link, useLoaderData } from "@tanstack/react-router";
import UserIcon from "@/assets/user.svg?react";

const ProfileButton = () => {
  const { user } = useLoaderData({
    from: "/_auth_routes",
  });

  return (
    <Link
      to="/profile"
      className="flex h-8 items-center gap-1.5 rounded-[40px] border border-primary p-2 md:h-10"
    >
      <>
        <UserIcon />
        <span className="text-[0.875rem] font-bold md:text-[1rem]">
          hi, {user.name.toLowerCase()}
        </span>
      </>
    </Link>
  );
};

export default ProfileButton;
