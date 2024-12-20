import Script from 'next/script';

export default function ThemeScript() {
  return (
    <Script
      id="theme-initializer"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            const savedTheme = localStorage.getItem('theme') || 'system';
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = savedTheme === 'dark' || (savedTheme === 'system' && prefersDark) ? 'dark' : 'light';
            document.documentElement.classList.add(theme);
          })();
        `,
      }}
    />
  );
}
