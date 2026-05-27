"use client";

import Image from "next/image";

export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Loading">
      <div className="page-loader__content">
        <div className="page-loader__logo">
          <Image src="/assets/favicon-32x32.png" alt="" width={48} height={48} priority />
        </div>
        <p className="page-loader__text">Ashish is Thinking...</p>
        <div className="page-loader__bar">
          <div className="page-loader__bar-fill" />
        </div>
      </div>
    </div>
  );
}
