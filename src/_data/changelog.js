module.exports = {
  log: [
    {
      date: "2025-02-26",
      type: "feature",
      content: "Fixed some layout wrapper overflow issues with bottom and top nav"
    },
    {
      date: "2025-02-23",
      type: "feature",
      content: "Added 88x31 gifs to https://httpster.io/subscribe/ and footer. updated top nav to accomodate more items. removed post-meta webmention form."
    },
    {
      date: "2025-01-23",
      type: "content",
      content: "New article about the flat tire."
    },
    {
      date: "2025-01-09",
      type: "design",
      content: "Added thin strokes to headings, making the bg color pop. Recolored changelog page and edited Subscribe page."
    },
    {
      date: "2025-01-08",
      type: "content",
      content: "Added blog post about productivity illusion"
    },
    {
      date: "2025-01-08",
      type: "feature",
      content: "Updated the feeds by adding <a href=\"/atom.xml\">atom.xml</a>, <a href=\"/rss.xml\">rss.xml</a> and <a href=\"/feed.json\">feed.json</a>"
    },
    {
      date: "2024-07-017",
      type: "content",
      content: "Added new post about family gathering"
    },
    {
      date: "2024-07-16",
      type: "content",
      content: "Added new post about the upcoming wedding"
    },
    {
      date: "2024-07-09",
      type: "content",
      content: "Fixed typos in the interweb rant. Working on a new post as well."
    },
    {
      date: "2024-07-09",
      type: "feature",
      content: "Restyled tags and themed site heading if on a themed page. Also using just one post-item partial for all post item types instead of one for each post type. Also, tags are now alphabetized."
    },
    {
      date: "2024-07-08",
      type: "content",
      content: "Added new article on current status of the internet."
    },
    {
      date: "2024-07-08",
      type: "feature",
      content: "Added a process.env check for draft posts and added green to article type posts."
    },
    {
      date: "2024-06-27",
      type: "feature",
      content: "Styled this page! Also, fixed possible overflow with long links in footnotes and tags getting stacked too closely vertically on mobile. Centered home content from markdown."
    },
    {
      date: "2024-06-27",
      type: "content",
      content: "New Symbol movie review added!"
    },
    {
      date: "2024-06-27",
      type: "feature",
      content: "Added review-score meta-section styling. Styled footnotes. Restyled tags in posts. Added a meta section for reviews with dt and dd for specs of reviewed thing. Readjusted button hover and active states when keyboard navigating. "
    },
    {
      date: "2024-06-27",
      type: "feature",
      content: "Added review-score.njk partial for review score box at the end of article. Added new font size var, step-min-2 and readjusted step-min-1. Added skip link theming and reworked figure image design."
    },
    {
      date: "2024-06-27",
      type: "feature",
      content: "Added two new filters, __yearsSinceDate__ and __YearsSinceYear__ which allow me to compare either a YYYY-MM-DD or YYYY date to the current year and get the output as an integer. Added __markdown-it-anchor__ to create linkable headings."
    },
    {
      date: "2024-06-26",
      type: "feature",
      content: "Reworked the main site heading text. Moved opengraph images to a new folder. Updated blog.njk to read partials based on post data type. Moved the h2 from home\\.md into home.njk so that it doesn't get a linkable heading."
    },
    {
      date: "2024-06-26",
      type: "feature",
      content: "Split review meta-sections into their own njk files, album-meta and film-meta based on reviewtype field in the posts."
    },
    {
      date: "2024-06-24",
      type: "feature",
      content: "Added umami back in again."
    },
    {
      date: "2024-06-21",
      type: "feature",
      content: "Removed tinylytics as the dev is not a nice person. Added a new article type, reviews and wrote Casiopea review. A bit hacky, but works. Updating logo header and main menu buttons."
    },
    {
      date: "2024-02-05",
      type: "feature",
      content: "First version of webmentions. Styled the kudos button and made a fancy ass box for the related meta stuff for posts."
    },
    {
      date: "2024-02-03",
      type: "feature",
      content: "Added tinylytics to test and kudos feature plus Mastodon links if I've shared it."
    },
    {
      date: "2024-01-30",
      type: "content",
      content: "Wrote a post on webfonts and CLS. Also added some styling for figures and videos."
    },
    {
      date: "2024-01-28",
      type: "feature",
      content: "No mobile hamburger menu boisss! Baleeted that code and just replaced with a lil css, hiding text and just showing icons on mobile"
    },
    {
      date: "2024-01-12",
      type: "feature",
      content: "Big feature upgrade! Now, the main content feed can have a mix of different content types, each with its own display right in the feed!"
    },
    {
      date: "2024-01-10",
      type: "feature",
      content: "Working on removing the mobile menu and having menu always visible. Also added different collection categories and pages to the top. not a fan of the button look tho."
    },
    {
      date: "2024-01-06",
      type: "feature",
      content: "Reworked changelog to read from js instead of plain markdown"
    },
    {
      date: "2024-01-04",
      type: "content",
      content: "Added new post about my back pain"
    },
    {
      date: "2024-01-01",
      type: "content",
      content: "New post about the new site"
    },
    {
      date: "2023-12-31",
      type: "design",
      content: "Updated bodyfont to Vollkorn and converted it to woff2. Writing new blog post."
    },
    {
      date: "2023-12-08",
      type: "feature",
      content: "Added tags back to the layout. Still gotta add categories. Also, updated [/about](/about) page with A/V gear and fixed nested list indentation."
    },
    {
      date: "2023-12-07",
      type: "feature",
      content: "Added a self hosted Umami instance for web analytics. Don't worry, it's privacy focused and doesn't track you. Also fixed some minor layout issues and backend code for collection generation."
    },
    {
      date: "2023-12-05",
      type: "design",
      content: "Made approx a bazillion changes to the CSS and page styles, imported old content and styles. Initial first version going live?"
    },
    {
      date: "2023-11-16",
      type: "design",
      content: "Forked Lena Saile's Eleventy Excellent -starter as a base and added old posts."
    }
  ]
};