import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics 4 (gtag) loader.
 *
 * Reads `VITE_GA_MEASUREMENT_ID` from the environment. Until that is set the
 * component renders nothing and no scripts load — set it once in a `.env.local`
 * (e.g. VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX) to enable tracking.
 */
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const Analytics = () => {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  // SPA page-view tracking. The initial pageview is fired by gtag('config', ...)
  // below, so we only report subsequent route changes here.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (GA_ID) {
      window.gtag?.('event', 'page_view', { page_path: pathname, page_title: document.title });
    }
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
        }}
      />
    </>
  );
};

export default Analytics;
