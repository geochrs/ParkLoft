const DEFAULT_PREFERENCES = {
  essential: true,
  analytics: false,
};

export function getCookiePreferences() {
  const stored = localStorage.getItem('pcookie');
  return stored ? JSON.parse(stored) : null;
}

export function saveCookiePreferences(prefs) {
  localStorage.setItem('pcookie', JSON.stringify(prefs));
}

export function applyCookiePreferences(prefs) {
  if (prefs.analytics) {
    enableAnalytics();
  } else {
    disableAnalytics();
  }
}

// Example for enabling analytics
function enableAnalytics() {
  // Only load script once
  if (!window.gtagScriptLoaded) {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-JRN08253DS';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-JRN08253DS');
    };

    window.gtagScriptLoaded = true;
  }
}

function disableAnalytics() {
  // Clear known analytics cookies if needed
  document.cookie = '_ga=; Max-Age=0; path=/;';
  document.cookie = '_gid=; Max-Age=0; path=/;';
}