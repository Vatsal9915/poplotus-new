"use client";

import { useEffect, useRef } from "react";

const HorizontalScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    const images = container.children;
    const imageCount = images.length;

    // Each image = 100vw → total horizontal width
    const totalWidth = window.innerWidth * imageCount;

    // Make the section tall enough to "hold" horizontal scrolling
    // i.e. width - one viewport
    const sectionHeight = totalWidth - window.innerWidth;

    section.style.height = `${sectionHeight + window.innerHeight}px`;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollTop = window.scrollY - section.offsetTop;

      if (scrollTop >= 0 && scrollTop <= sectionHeight) {
        // Lock sticky and move horizontally
        container.style.transform = `translateX(-${scrollTop}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      <div
        ref={containerRef}
        className="sticky top-0 left-0 h-screen flex"
        style={{ width: "max-content" }}
      >
        {/* Example images */}
        <div className="w-screen h-screen flex items-center justify-center bg-red-300 text-4xl font-bold">
          Product 1
        </div>
        <div className="w-screen h-screen flex items-center justify-center bg-green-300 text-4xl font-bold">
          Product 2
        </div>
        <div className="w-screen h-screen flex items-center justify-center bg-blue-300 text-4xl font-bold">
          Product 3
        </div>
        <div className="w-screen h-screen flex items-center justify-center bg-yellow-300 text-4xl font-bold">
          Product 4
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
