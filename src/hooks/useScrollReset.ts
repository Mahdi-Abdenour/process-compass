 import { useEffect } from "react";
 import { useLocation } from "react-router-dom";
 
 /**
  * Hook to reset scroll position to top when navigating to a new route.
  * Use this in detail views to ensure they always open at the top.
  */
 export function useScrollReset() {
   const { pathname } = useLocation();
 
   useEffect(() => {
     // Immediate scroll reset to top
     window.scrollTo(0, 0);
     
     // Also reset any scroll containers that might be present
     const scrollContainers = document.querySelectorAll('[data-scroll-container]');
     scrollContainers.forEach((container) => {
       container.scrollTop = 0;
     });
   }, [pathname]);
 }
 
 /**
  * Hook to reset scroll when a specific condition changes (e.g., opening a drawer)
  */
 export function useScrollResetOnChange(trigger: boolean, containerRef?: React.RefObject<HTMLElement>) {
   useEffect(() => {
     if (trigger) {
       if (containerRef?.current) {
         containerRef.current.scrollTop = 0;
       } else {
         window.scrollTo(0, 0);
       }
     }
   }, [trigger, containerRef]);
 }