import React, { useEffect } from 'react';

function GoogleReviewsWidget() {
  useEffect(() => {
    if (window.elfsightPlatform && typeof window.elfsightPlatform.init === 'function') {
      try {
        window.elfsightPlatform.init();
      } catch (err) {
        console.error('Elfsight init error:', err);
      }
    } else {
      const existingScript = document.querySelector('script[src*="elfsight"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = "https://elfsightcdn.com/platform.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  return (
    <>
      <style>
        {`
          /* Hide the branding text */
          .elfsight-app-7deadc13-364e-4823-9795-ac43e84b0f79 .eapps-link,
          .elfsight-app-7deadc13-364e-4823-9795-ac43e84b0f79 a[href*="elfsight.com"] {
            display: none !important;
          }
        `}
      </style>
      <div className="elfsight-app-7deadc13-364e-4823-9795-ac43e84b0f79" data-elfsight-app-lazy></div>
    </>
  );
}

export default GoogleReviewsWidget;
