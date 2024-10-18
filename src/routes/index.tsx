import { Link, createFileRoute } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import SplitType from "split-type";
import Recommend from "@/assets/recommend.svg?react";
import Recycle from "@/assets/recycle.svg?react";
import FooterText from "@/components/footer-text";

gsap.registerPlugin(TextPlugin);

export const Index = () => {
  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.from(".recommend", {
        rotateZ: -360,
        duration: 3.5,
        scale: 1.2,
        ease: "linear",
      });
      tl.to(".recommend", {
        rotateZ: 360,
        duration: 3.5,
        scale: 0.8,
        ease: "linear",
      });

      const tl2 = gsap.timeline();
      const split = new SplitType("#desc", {
        types: "words,chars",
      });

      tl2.to("#welcome", {
        duration: 2,
        text: "welcome to scrapper!",
        stagger: 0.1,
      });
      tl2.from(split.words, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
      });
      tl2.from("#cta", {
        y: 50,
        opacity: 0,
        delay: 0.25,
        duration: 0.25,
      });

      const recycle = document.querySelector("#recycle");

      const top = gsap.utils.toArray(["#top1", "#top2"], recycle);
      const left = gsap.utils.toArray(["#left1", "#left2"], recycle);
      const right = gsap.utils.toArray(["#right1", "#right2"], recycle);

      const tl3 = gsap.timeline({
        repeat: -1,
        yoyo: true,
        ease: "linear",
        duration: 1,
        repeatDelay: 0.125,
      });

      tl3.to(top, {
        y: -20,
        x: -20,
        scale: 0.925,
        duration: 0.25,
      });

      tl3.to(right, {
        y: -20,
        x: -20,
        scale: 0.925,
        duration: 0.25,
      });

      tl3.to(left, {
        x: -20,
        y: -20,
        scale: 0.925,
        duration: 0.25,
      });
    },
    {
      dependencies: [],
    },
  );

  return (
    <main>
      <Recommend className="recommend absolute -left-6 -top-[36px] -z-20 h-48 w-36 md:-left-14 md:-top-[36px] md:h-80 md:w-80" />
      <Recycle
        id="recycle"
        className="fixed bottom-8 right-4 h-52 w-52 overflow-visible md:h-80 md:w-80"
      />

      <section className="landing-page__text">
        <div className="flex flex-col items-center">
          <h1
            id="welcome"
            className="mb-3 text-center text-[2rem] font-bold text-primary md:text-[4rem]"
          ></h1>
          <div className="mb-8 overflow-hidden">
            <p
              id="desc"
              className="max-w-[386px] text-center text-[0.875rem] text-form_text md:max-w-[516px] md:text-[1.25rem]"
            >
              your automated help in job search. scrapper brings jobs to you in
              no stress
            </p>
          </div>
          <Link to="/signup" id="cta" className="overflow-hidden">
            <button className="h-[40px] rounded-[40px] bg-primary px-10 text-[1.25rem] font-semibold text-[#FAFAFAFA] md:h-[72px]">
              get started
            </button>
          </Link>
        </div>
      </section>

      <FooterText />
    </main>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
