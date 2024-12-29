import siteMetadata from '@/data/siteMetadata'
(function() {
  const theme = localStorage.getItem('theme') || siteMetadata.theme;
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (theme === 'dark' || (theme ==="system" && prefersDarkMode)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();
