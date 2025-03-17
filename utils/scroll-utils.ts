import type React from "react"
/**
 * Smoothly scrolls to the specified element ID
 */
export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId)
  if (element) {
    // Get the element's position
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate position accounting for any fixed headers
    // Use different offset for mobile vs desktop
    const isMobile = window.innerWidth < 768;
    const headerOffset = isMobile ? 80 : 64; // Larger offset for mobile
    const offsetPosition = rect.top + scrollTop - headerOffset;
    
    // Scroll to the adjusted position
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    
    // For mobile, we need an additional check to ensure the scroll worked
    if (isMobile) {
      // Add a small delay to check if we need to adjust the scroll position
      setTimeout(() => {
        // Check if the element is now visible in the viewport
        const newRect = element.getBoundingClientRect();
        if (newRect.top < 0 || newRect.top > 100) {
          // If not properly visible, adjust the scroll position
          window.scrollTo({
            top: window.pageYOffset + newRect.top - headerOffset,
            behavior: "smooth"
          });
        }
      }, 500);
    }
  }
}

/**
 * Handles click on hash links to smoothly scroll instead of jumping
 */
export function handleHashLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault()

  // If it's just "#", scroll to top
  if (href === "#") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    return
  }

  // Otherwise scroll to the section
  const targetId = href.replace("#", "")
  scrollToElement(targetId)
}

