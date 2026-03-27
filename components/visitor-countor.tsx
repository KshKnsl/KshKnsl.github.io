import { useEffect, useRef } from "react";

const VisitorCounter = () => {
  const counterRef = useRef<HTMLDivElement>(null);
  const widgetClass = "elfsight-app-d3c0a654-8d55-4388-ac94-8a1b0115b1cd";
  const scriptSrc = "https://static.elfsight.com/platform/platform.js";

  useEffect(() => {
    if (!counterRef.current) return;

    // Keep exactly one widget instance inside this component.
    counterRef.current.innerHTML = "";
    const counterDiv = document.createElement("div");
    counterDiv.className = widgetClass;
    counterDiv.setAttribute("data-elfsight-app-lazy", "");
    counterRef.current.appendChild(counterDiv);

    // Avoid adding duplicate platform scripts.
    const existingScript = document.querySelector(
      `script[src="${scriptSrc}"]`
    ) as HTMLScriptElement | null;
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    }

    // Remove stale duplicate widget mounts outside this container.
    const allWidgetNodes = document.querySelectorAll(`.${widgetClass}`);
    allWidgetNodes.forEach((node) => {
      if (!counterRef.current?.contains(node)) {
        node.remove();
      }
    });

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

    setTimeout(() => {
      clearInterval(adInterval);
    }, 10000);

    return () => {
      clearInterval(adInterval);
      if (counterRef.current) {
        counterRef.current.innerHTML = "";
      }
    };
  }, []);

  return <div className="viscount w-full flex items-center justify-center overflow-x-auto" ref={counterRef}></div>;
};

export default VisitorCounter;

