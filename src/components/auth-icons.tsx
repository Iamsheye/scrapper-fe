import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import TopLeft from "@/assets/auth-topleft.svg?react";
import TopRight from "@/assets/auth-topright.svg?react";

const AuthIcons = () => {
  useGSAP(
    () => {
      gsap.to("#topLeft", {
        y: 25,
        duration: 3.5,
        repeat: -1,
        ease: "back.inOut",
        yoyo: true,
      });

      gsap.to("#topRight", {
        y: -25,
        duration: 3.5,
        repeat: -1,
        ease: "back.inOut",
        yoyo: true,
      });
    },
    {
      dependencies: [],
    },
  );

  return (
    <>
      <TopLeft
        id="topLeft"
        className="absolute left-0 top-0 h-[213px] w-[213px] lg:h-[368px] lg:w-[368px]"
      />
      <TopRight
        id="topRight"
        className="absolute right-0 top-0 h-[213px] w-[213px] lg:h-[368px] lg:w-[368px]"
      />
    </>
  );
};

export default AuthIcons;
