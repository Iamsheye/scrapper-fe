import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import SplitType from "split-type";

gsap.registerPlugin(TextPlugin);

const FooterText = () => {
  useGSAP(
    () => {
      const wordSplit = new SplitType("#footer", {
        types: "words",
      });

      wordSplit.words?.forEach((word) => {
        if (word.textContent === "mo") {
          gsap.set(word, {
            textDecoration: "underline",
          });
        }
        if (word.textContent === "sheye") {
          gsap.set(word, {
            textDecoration: "underline",
          });
        }
      });

      gsap.from(wordSplit.words, {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        delay: location.pathname === "/" ? 4.5 : 0.25,
      });
    },
    {
      dependencies: [],
    },
  );
  return (
    <footer className="sticky bottom-3 mt-3 overflow-hidden">
      <p
        id="footer"
        className="text-center text-[0.875rem] font-medium text-form_text md:text-[1.25rem]"
      >
        designed & developed by{" "}
        <a
          href="https://mojola.notion.site/Mojola-Ojoniyi-5012964d6a1c4f958780a9d4e31a3cbe"
          target="_blank"
        >
          mo
        </a>{" "}
        &{" "}
        <a href="https://linkedin.com/in/majek-sheye" target="_blank">
          sheye
        </a>
      </p>
    </footer>
  );
};

export default FooterText;
