/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Culture DevOps',
  author: 'Sébastien Chossat',
  headerTitle: 'Culture DevOps',
  description: 'A blog created with Next.js, i18n and Tailwind.css',
  language: 'fr',
  theme: process.env.NEXT_PUBLIC_SITE_THEME, // system, dark or light
  siteUrl: 'https://culturedevops.com',
  siteRepo: 'https://github.com/CultureDevOps/blog',
  siteLogo: '/static/images/assets/logo.png',
  socialBanner: '/static/images/assets/x-card-04.png',
  mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'culturedevops@gmail.com',
  github: 'https://github.com/CultureDevOps',
  x: 'https://x.com/S_Chossat',
  // twitter: 'https://twitter.com/Twitter',
  facebook: 'https://www.facebook.com/sebastien.chossat',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com/in/sébastien-chossat-88a30a73',
  threads: 'https://www.threads.net',
  instagram: 'https://www.instagram.com',
  locale: 'en',
  multiauthors: false,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    /*umamiAnalytics: {
      // We use an env variable for this site to avoid other users cloning our analytics ID
      umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
    },*/
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    googleAnalytics: {
      googleAnalyticsId: process.env.NEXT_GOOGLE_ANALYTICS_KEY, // e.g. G-XXXXXXX
    },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
    // Please add your .env file and modify it according to your selection
    // provider: 'buttondown',
  },
  iscomments: true,
  comments: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'title', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'preferred_color_scheme',
      // theme when dark mode
      // darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
      // This corresponds to the `data-lang="en"` in giscus's configurations
      lang: 'fr',
    },
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: 'search.json', // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
  // formspree support :
  //if set to false, simple "mailto"
  // if set to true, get a free account there : https://formspree.io/ and go to read.me doc
  formspree: true,
  // waline support
  iswaline: false,
  walineServer: '',
}

module.exports = siteMetadata
