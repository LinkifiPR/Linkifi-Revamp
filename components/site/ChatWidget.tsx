import Script from "next/script";

/**
 * LeadConnector chat widget.
 * Only rendered on marketing pages (homepage, service pages, contact).
 * Intentionally excluded from blog, case studies, and admin pages.
 */
export function ChatWidget() {
  return (
    <Script
      id="leadconnector-widget-loader"
      src="https://widgets.leadconnectorhq.com/loader.js"
      data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
      data-widget-id="692ed101617509fd4395444e"
      strategy="afterInteractive"
    />
  );
}
