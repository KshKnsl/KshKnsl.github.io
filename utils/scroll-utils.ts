import type React from "react"

export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId)
  if (element) {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    const isMobile = window.innerWidth < 768;
    const headerOffset = isMobile ? 80 : 64; 
    const offsetPosition = rect.top + scrollTop - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    
    if (isMobile) {
      setTimeout(() => {
        const newRect = element.getBoundingClientRect();
        if (newRect.top < 0 || newRect.top > 100) {
          window.scrollTo({
            top: window.pageYOffset + newRect.top - headerOffset,
            behavior: "smooth"
          });
        }
      }, 500);
    }
  }
}

export function handleHashLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault()

  if (href === "#") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    return
  }
  const targetId = href.replace("#", "")
  scrollToElement(targetId)
}