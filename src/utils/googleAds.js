export const trackGoogleAdsClick = (label = 'cta_click') => {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-17439900046',
      event_category: 'engagement',
      event_label: label,
      value: 1,
    });
  }
};
