"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    chatwootSettings: any;
    chatwootSDK: any;
  }
}

const ChatwootWidget = () => {
  useEffect(() => {
    window.chatwootSettings = {
      position: 'right',
      type: 'standard',
      launcherTitle: '',
    };

    (function(d, t) {
      const BASE_URL = "https://app.chatwoot.com";
      const g: any = d.createElement(t), s: any = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + "/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g, s);
      g.onload = function() {
        window.chatwootSDK.run({
          websiteToken: 'hoT1v6UhMUSuTBEZVgbBgK1o',
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }, []);

  return null;
};

export default ChatwootWidget;
