import { Application, SPEObject } from "@splinetool/runtime";
import gsap from "gsap";
import { SKILLS } from "@/data/constants";
import { sleep } from "@/lib/utils";
import { getKeyboardState, Section } from "./keyboard-states";

export type Animation = { start: () => void; stop: () => void };

const NOOP_ANIMATION: Animation = { start: () => {}, stop: () => {} };

/** Flip-book animation of the bongo cat, shown on the projects section. */
export const createBongoAnimation = (app: Application): Animation => {
  const framesParent = app.findObjectByName("bongo-cat");
  const frame1 = app.findObjectByName("frame-1");
  const frame2 = app.findObjectByName("frame-2");
  if (!frame1 || !frame2 || !framesParent) return NOOP_ANIMATION;

  let interval: ReturnType<typeof setInterval> | undefined;
  const start = () => {
    clearInterval(interval);
    let i = 0;
    framesParent.visible = true;
    interval = setInterval(() => {
      frame1.visible = i % 2 === 0;
      frame2.visible = i % 2 !== 0;
      i++;
    }, 100);
  };
  const stop = () => {
    clearInterval(interval);
    framesParent.visible = false;
    frame1.visible = false;
    frame2.visible = false;
  };
  return { start, stop };
};

/** Keycaps floating up and down, shown on the contact section. */
export const createKeycapsAnimation = (app: Application): Animation => {
  let tweens: gsap.core.Tween[] = [];
  const removePrevTweens = () => {
    tweens.forEach((t) => t.kill());
    tweens = [];
  };

  const start = () => {
    removePrevTweens();
    Object.values(SKILLS)
      .sort(() => Math.random() - 0.5)
      .forEach((skill, idx) => {
        const keycap = app.findObjectByName(skill.name);
        if (!keycap) return;
        tweens.push(
          gsap.to(keycap.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.6,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
          })
        );
      });
  };
  const stop = () => {
    removePrevTweens();
    Object.values(SKILLS).forEach((skill) => {
      const keycap = app.findObjectByName(skill.name);
      if (!keycap) return;
      tweens.push(
        gsap.to(keycap.position, {
          y: 0,
          duration: 4,
          repeat: 1,
          ease: "elastic.out(1,0.8)",
        })
      );
    });
    setTimeout(removePrevTweens, 1000);
  };
  return { start, stop };
};

/** Continuous spin on the hero and "teardown" wobble on the contact section. */
export const createKeyboardRotations = (kbd: SPEObject) => {
  const rotate = gsap.to(kbd.rotation, {
    y: Math.PI * 2 + kbd.rotation.y,
    duration: 10,
    repeat: -1,
    yoyo: true,
    yoyoEase: true,
    ease: "back.inOut",
    delay: 2.5,
  });
  const teardown = gsap.fromTo(
    kbd.rotation,
    { y: 0, x: -Math.PI, z: 0 },
    {
      y: -Math.PI / 2,
      duration: 5,
      repeat: -1,
      yoyo: true,
      yoyoEase: true,
      delay: 2.5,
      immediateRender: false,
      paused: true,
    }
  );
  return { rotate, teardown };
};

/** Pop the keyboard in and drop the keycaps one by one. */
export const revealKeyCaps = async (
  app: Application,
  section: Section,
  isMobile: boolean
) => {
  const kbd = app.findObjectByName("keyboard");
  if (!kbd) return;
  kbd.visible = false;
  await sleep(400);
  kbd.visible = true;
  const { scale } = getKeyboardState(section, isMobile);
  gsap.fromTo(
    kbd.scale,
    { x: 0.01, y: 0.01, z: 0.01 },
    { ...scale, duration: 1.5, ease: "elastic.out(1, 0.6)" }
  );

  const allObjects = app.getAllObjects();
  const keycaps = allObjects.filter((obj) => obj.name === "keycap");
  await sleep(900);
  if (isMobile) {
    allObjects
      .filter((obj) => obj.name === "keycap-mobile")
      .forEach((keycap) => {
        keycap.visible = true;
      });
  } else {
    allObjects
      .filter((obj) => obj.name === "keycap-desktop")
      .forEach(async (keycap, idx) => {
        await sleep(idx * 70);
        keycap.visible = true;
      });
  }
  keycaps.forEach(async (keycap, idx) => {
    keycap.visible = false;
    await sleep(idx * 70);
    keycap.visible = true;
    gsap.fromTo(
      keycap.position,
      { y: 200 },
      { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" }
    );
  });
};
