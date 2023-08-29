declare const window: Window &
  typeof globalThis & {
    gtag: any;
  };

export const pageview = (url: string) => {
  window.gtag("config", import.meta.env.VITE_GOOGLE_ANALYTICS, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: any) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};