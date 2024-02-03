module.exports = {
  url: process.env.URL || 'http://localhost:8080',
  webmentionUrl: 'https://httpster.io',
  domain: 'httpster.io',
  siteName: 'httpster.io',
  siteDescription: 'My personal site',
  siteType: 'Person', // schema
  locale: 'en_EN',
  lang: 'en',
  skipContent: 'Skip to content',
  author: 'httpsterio',
  authorEmail: 'sami @ domain',
  authorWebsite: 'https://httpster.io',
  proof: 'provenc3d7aa',
  themeColor: '#f3f3f3',
  themeBgColor: '#0c0c0c',
  meta_data: {
    opengraph_default: '/assets/images/og-img.jpg',
    opengraph_default_alt: 'Visible content:httpsterios website',
    twitterSite: '',
    twitterCreator: '',
    mastodonProfile: 'https://social.lol/@sami'
  },
  blog: {
    // this is for the rss feed
    name: 'httpsterio\'s ramblings and articles',
    description: 'The random ramblings of a Finnish 30-something year old designer and creative.'
  },
  pagination: {
    itemsPerPage: 20
  },
  menu: {
    closedText: 'Menu'
  }
};
