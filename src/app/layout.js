'use client';
import "./globals.css";

import { useEffect } from 'react';
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  useEffect(() => {
    const clickSound = new Audio('/clicksound.mp4');

    const handleClick = () => {
      // Reset audio in case user clicks rapidly
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
