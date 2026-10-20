"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisGSAPSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", updateScrollTrigger);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(updateLenis);
      gsap.ticker.lagSmoothing(500);
    };
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        smoothWheel: true,
        anchors: true,
        syncTouch: false,
      }}
    >
      <LenisGSAPSync />
      {children}
    </ReactLenis>
  );
}
