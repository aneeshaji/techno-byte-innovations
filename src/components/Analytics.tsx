import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics 4 (gtag) loader.
 *
 * Reads `VITE_GA_MEASUREMENT_ID` from the environment. Until that is set the
 * component renders nothing and no scripts load — set it once in a `.env.local`
 * (e.g. VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX) to enable tracking.
 */
const GA_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || 'G-D5BDQPCWNM';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const Analytics = () => {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  // SPA page-view tracking on client route changes
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (window.gtag) {
      window.gtag('config', GA_ID, {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [pathname]);

  return null;
};

export default Analytics;
