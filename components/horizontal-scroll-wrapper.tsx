"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface HorizontalScrollWrapperProps {
  children: React.ReactNode[]
}

export default function HorizontalScrollWrapper({ children }: HorizontalScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const scroller = scrollerRef.current

    if (!container || !scroller) return

    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = scrollTop / maxScroll

      // Calculate horizontal translation
      const maxTranslateX = scroller.scrollWidth - window.innerWidth
      const translateX = scrollProgress * maxTranslateX

      scroller.style.transform = `translateX(-${Math.min(translateX, maxTranslateX)}px)`
    }

    // Set up the scroll height to allow for horizontal scrolling
    const updateScrollHeight = () => {
      if (scroller) {
        const scrollWidth = scroller.scrollWidth
        const viewportWidth = window.innerWidth
        const scrollMultiplier = scrollWidth / viewportWidth
        document.body.style.height = `${window.innerHeight * scrollMultiplier}px`
      }
    }

    updateScrollHeight()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", updateScrollHeight)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateScrollHeight)
      document.body.style.height = "auto"
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-screen overflow-hidden">
      <div
        ref={scrollerRef}
        className="flex h-full transition-transform duration-100 ease-out"
        style={{ width: `${children.length * 100}vw` }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="w-screen h-full flex-shrink-0 overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
