//
// Re-implemented without external dependencies.
//
// We use the built-in Web Animations API to avoid the AnimeJS bundle
// (which was failing to load with the correct MIME type inside Next.js).
//

/**
 * Runs a simple “fade-up” animation (translateY + opacity) on the provided
 * element. The animation is executed once and leaves the element in its
 * final state.
 */
export const fadeUpAnimation = (element: Element) => {
  // Guard against browsers that might not support WAAPI (very rare nowadays)
  if (!("animate" in element)) {
    // Fallback – just reveal element instantly
    element.classList.remove("opacity-0", "translate-y-24")
    return
  }

  element.animate(
    [
      { transform: "translateY(100px)", opacity: 0 },
      { transform: "translateY(0px)", opacity: 1 },
    ],
    {
      duration: 1000,
      easing: "ease-out",
      fill: "forwards", // keep final style after animation ends
    },
  )
}

/**
 * Attaches an IntersectionObserver to every element with data-aos="fade-up".
 * When an element becomes visible, it triggers the fade-up animation and then
 * stops observing that element.
 */
export const setupIntersectionObserver = () => {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fadeUpAnimation(entry.target)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll('[data-aos="fade-up"]').forEach((el) => observer.observe(el))
}
