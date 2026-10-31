import React, { useEffect, useRef } from 'react';

const PatientReviews = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
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
              script.src = 'https://elfsightcdn.com/platform.js';
              script.async = true;
              document.body.appendChild(script);
            }
          }
        }
      },
      { rootMargin: '300px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-tr from-[#edf8f4] via-[#ffffff] to-[#e4f5ee] py-14 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background glow matching website aesthetic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-16 w-[520px] h-[520px] bg-[#1CB6E6]/12 rounded-full blur-[110px]" />
        <div className="absolute -bottom-24 -left-16 w-[520px] h-[520px] bg-[#00B771]/12 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
        <style>
          {`
            /* Hide the Elfsight branding badge if desired */
            .elfsight-app-7deadc13-364e-4823-9795-ac43e84b0f79 .eapps-link,
            .elfsight-app-7deadc13-364e-4823-9795-ac43e84b0f79 a[href*="elfsight.com"] {
              display: none !important;
            }
          `}
        </style>

        {/* Real Google Reviews via Elfsight Widget */}
        <div
          className="elfsight-app-7deadc13-364e-4823-9795-ac43e84b0f79"
          data-elfsight-app-lazy
        ></div>
      </div>
    </section>
  );
};

export default PatientReviews;
