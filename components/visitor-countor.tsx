import { useEffect, useRef } from "react";

const VisitorCounter = () => {
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Elfsight script
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Create counter div inside the "viscount" div
    if (counterRef.current) {
      const counterDiv = document.createElement("div");
      counterDiv.className = "elfsight-app-d3c0a654-8d55-4388-ac94-8a1b0115b1cd";
      counterDiv.setAttribute("data-elfsight-app-lazy", "");
      counterRef.current.appendChild(counterDiv);
    }

    // Remove Elfsight branding links
    const adInterval = setInterval(() => {
      const allLinks = document.getElementsByTagName("a");
      for (let i = 0; i < allLinks.length; i++) {
        const href = allLinks[i].getAttribute("href");
        if (
          href &&
          href.startsWith(
            "https://elfsight.com/visitor-counter-widget/?utm_source=websites&utm_medium=clients&utm_content=visitor-counter"
          )
        ) {
          allLinks[i].style.display = "none";
        }
      }
    }, 100);

    // Stop checking after 10 seconds
    setTimeout(() => {
      clearInterval(adInterval);
    }, 10000);

    return () => {
      clearInterval(adInterval);
    };
  }, []);

  return <div className="viscount" ref={counterRef}></div>;
};

export default VisitorCounter;

