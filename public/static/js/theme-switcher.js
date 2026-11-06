(function() {
  const theme = localStorage.getItem('theme') || window.siteMetadata.theme;
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (theme === 'dark' || (theme ==="system" && prefersDarkMode)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();
