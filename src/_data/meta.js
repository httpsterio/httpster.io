module.exports = {
  url: process.env.URL || 'http://localhost:8080',
  siteName: 'httpster.io',
  siteDescription: 'My personal site',
  siteType: 'Person', // schema
  locale: 'en_EN',
  lang: 'en',
  skipContent: 'Skip to content',
  author: 'httpsterio',
  authorEmail: 'sami @ domain',
  authorWebsite: 'https://httpster.io',
  themeColor: '#DD4462',
  themeBgColor: '#F3F3F3',
  meta_data: {
    opengraph_default: '/assets/images/opengraph-default.jpg',
    opengraph_default_alt: 'Visible content:httpsterios website',
    twitterSite: '',
    twitterCreator: '',
    mastodonProfile: 'https://toot.wales/@sami'
  },
  blog: {
    // this is for the rss feed
    name: 'My great Web Development Blog',
    description: 'Tell the word what you are writing about in your blog! It will show up on feed readers.'
  },
  pagination: {
    itemsPerPage: 20
  },
  address: {
    // edit all presets or leave empty. They are being used in the pages for privacy.md and imprint.md
    firma: 'Organization name',
    street: '123 Main St.',
    city: 'Ciudad',
    state: 'Estado',
    zip: '12345',
    mobileDisplay: '+34 1234567',
    mobileCall: ' +341234567',
    email: 'hola@yoursite.com',
    cif: ''
  },
  menu: {
    closedText: 'Menu'
  }
};
