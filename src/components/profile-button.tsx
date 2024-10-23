import { useContext } from "react";
import { Link } from "@tanstack/react-router";
import UserIcon from "@/assets/user.svg?react";
import { UserContext } from "@/routes/_auth_routes";

const ProfileButton = () => {
  const user = useContext(UserContext);

  return (
    <Link to="/profile">
      <button className="flex h-8 items-center gap-1.5 rounded-[40px] border border-primary p-2 md:h-10">
        <UserIcon />
        <span className="text-[0.875rem] font-bold md:text-[1rem]">
          hi, {user?.name.toLowerCase()}
        </span>
      </button>
    </Link>
  );
};

export default ProfileButton;
