import Script from "next/script";

const Analytics = () => {

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-9Q6VQMFQWB"
      />
      <Script id="analytics-script">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-9Q6VQMFQWB', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
};

export default Analytics;
