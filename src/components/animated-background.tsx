"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Skill, SkillNames, SKILLS } from "@/data/constants";
import { sleep } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePreloader } from "./preloader";
import { useTheme } from "next-themes";
import ErrorBoundary from "./error-boundary";
import { getKeyboardState, Section } from "./keyboard/keyboard-states";
import {
  Animation,
  createBongoAnimation,
  createKeyboardRotations,
  createKeycapsAnimation,
  revealKeyCaps,
} from "./keyboard/keyboard-animations";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

gsap.registerPlugin(ScrollTrigger);

// Home-page sections the keyboard reacts to, in scroll order.
const SCROLL_STEPS: { trigger: string; start: string; section: Section; prev: Section }[] = [
  { trigger: "#skills", start: "top 50%", section: "skills", prev: "hero" },
  { trigger: "#projects", start: "top 70%", section: "projects", prev: "skills" },
  { trigger: "#contact", start: "top 30%", section: "contact", prev: "projects" },
];

const AnimatedBackground = () => {
  const { isLoading, bypassLoading } = usePreloader();
  const { theme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [splineApp, setSplineApp] = useState<Application>();

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const bongoAnimation = useRef<Animation>();
  const keycapAnimations = useRef<Animation>();
  const keyboardRevealed = useRef(false);

  // Show the hovered/pressed skill on the keyboard's screen.
  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill, splineApp]);

  // Hover and key-press interactions.
  useEffect(() => {
    if (!splineApp) return;
    const clearText = () => {
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    };
    const onKeyDown = (e: SplineEvent) => {
      const skill = SKILLS[e.target.name as SkillNames];
      if (!skill) return;
      setSelectedSkill(skill);
      // Set directly too: pressing the same key again won't change state.
      splineApp.setVariable("heading", skill.label);
      splineApp.setVariable("desc", skill.shortDescription);
    };
    const onHover = (e: SplineEvent) => {
      if (e.target.name === "body" || e.target.name === "platform") {
        setSelectedSkill(null);
        if (splineApp.getVariable("heading") && splineApp.getVariable("desc"))
          clearText();
        return;
      }
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill) setSelectedSkill(skill);
    };
    splineApp.addEventListener("keyUp", clearText);
    splineApp.addEventListener("keyDown", onKeyDown);
    splineApp.addEventListener("mouseHover", onHover);
    return () => {
      splineApp.removeEventListener("keyUp", clearText);
      splineApp.removeEventListener("keyDown", onKeyDown);
      splineApp.removeEventListener("mouseHover", onHover);
    };
  }, [splineApp]);

  // Only show the skill text on the skills section, in the right theme/layout.
  useEffect(() => {
    if (!splineApp) return;
    const texts = {
      desktopDark: splineApp.findObjectByName("text-desktop-dark"),
      desktopLight: splineApp.findObjectByName("text-desktop"),
      mobileDark: splineApp.findObjectByName("text-mobile-dark"),
      mobileLight: splineApp.findObjectByName("text-mobile"),
    };
    if (Object.values(texts).some((t) => !t)) return;
    const show = activeSection === "skills";
    const dark = theme === "dark";
    // The "light" text objects are the ones readable on a dark background.
    texts.desktopLight!.visible = show && dark && !isMobile;
    texts.mobileLight!.visible = show && dark && isMobile;
    texts.desktopDark!.visible = show && !dark && !isMobile;
    texts.mobileDark!.visible = show && !dark && isMobile;
  }, [theme, splineApp, isMobile, activeSection]);

  // Create the reusable animations once the scene has loaded.
  useEffect(() => {
    if (!splineApp) return;
    bongoAnimation.current = createBongoAnimation(splineApp);
    keycapAnimations.current = createKeycapsAnimation(splineApp);
    return () => {
      bongoAnimation.current?.stop();
      keycapAnimations.current?.stop();
    };
  }, [splineApp]);

  // Move the keyboard between sections as the page scrolls.
  useEffect(() => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    const moveTo = (section: Section) => {
      setActiveSection(section);
      const { scale, position, rotation } = getKeyboardState(section, isMobile);
      gsap.to(kbd.scale, { ...scale, duration: 1 });
      gsap.to(kbd.position, { ...position, duration: 1 });
      gsap.to(kbd.rotation, { ...rotation, duration: 1 });
    };

    const hero = getKeyboardState("hero", isMobile);
    gsap.set(kbd.scale, hero.scale);
    gsap.set(kbd.position, hero.position);

    const triggers = SCROLL_STEPS.map(({ trigger, start, section, prev }) =>
      ScrollTrigger.create({
        trigger,
        start,
        end: "bottom bottom",
        onEnter: () => moveTo(section),
        onLeaveBack: () => moveTo(prev),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, [splineApp, isMobile]);

  // Per-section animations (spin, bongo cat, floating keycaps).
  useEffect(() => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;
    const { rotate, teardown } = createKeyboardRotations(kbd);
    let cancelled = false;

    (async () => {
      if (activeSection === "hero") {
        rotate.restart();
        teardown.pause();
      } else {
        rotate.pause();
        if (activeSection !== "contact") teardown.pause();
      }
      if (activeSection !== "skills") {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
      if (activeSection === "projects") {
        await sleep(300);
        if (!cancelled) bongoAnimation.current?.start();
      } else {
        await sleep(200);
        if (!cancelled) bongoAnimation.current?.stop();
      }
      await sleep(600);
      if (cancelled) return;
      if (activeSection === "contact") {
        teardown.restart();
        keycapAnimations.current?.start();
      } else {
        teardown.pause();
        keycapAnimations.current?.stop();
      }
    })();

    return () => {
      cancelled = true;
      rotate.kill();
      teardown.kill();
    };
  }, [activeSection, splineApp]);

  // Keep the URL hash in sync without adding browser-history entries.
  // Skipped on mount so deep links like /#projects keep their hash.
  const hashSyncReady = useRef(false);
  useEffect(() => {
    if (!hashSyncReady.current) {
      hashSyncReady.current = true;
      return;
    }
    const hash = activeSection === "hero" ? "" : `#${activeSection}`;
    window.history.replaceState(null, "", window.location.pathname + hash);
  }, [activeSection]);

  // Reveal the keyboard once, after the preloader finishes.
  useEffect(() => {
    if (!splineApp || isLoading || keyboardRevealed.current) return;
    keyboardRevealed.current = true;
    revealKeyCaps(splineApp, activeSection, isMobile);
  }, [splineApp, isLoading, activeSection, isMobile]);

  return (
    <ErrorBoundary>
      <Suspense fallback={null}>
        <Spline
          onLoad={(app: Application) => {
            setSplineApp(app);
            bypassLoading();
          }}
          scene="/assets/skills-keyboard.spline"
        />
      </Suspense>
    </ErrorBoundary>
  );
};

export default AnimatedBackground;
