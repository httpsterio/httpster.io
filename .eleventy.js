const rssPlugin = require("@11ty/eleventy-plugin-rss");
// const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Import filters
const dateFilter = require("./site/filters/date-filter.js");
const markdownFilter = require("./site/filters/markdown-filter.js");
const w3DateFilter = require("./site/filters/w3-date-filter.js");

// Import transforms
const htmlMinTransform = require("./site/transforms/html-min-transform.js");
const parseTransform = require("./site/transforms/parse-transform.js");
const criticalCSSTransform = require("./site/transforms/critical-css-transform.js");

// Import data files
const site = require("./site/_data/site.js");

module.exports = function (config) {
  // Filters
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("markdownFilter", markdownFilter);
  config.addFilter("w3DateFilter", w3DateFilter);

  // Transforms
  config.addTransform("parse", parseTransform);
  if (site.criticalCSS) {
    config.addTransform("critical-css", criticalCSSTransform);
    config.addTransform("htmlmin", htmlMinTransform);
  } else {
    // Critical will also minify
    config.addTransform("htmlmin", htmlMinTransform);
  }

  // Custom collections
  const now = new Date();

  // Creates a const for all posts that are not drafts and publish date is either today or earlier.
  const livePosts = article => article.date <= now && !article.data.draft;

  config.addCollection("article", collection => {
    return [
      ...collection.getFilteredByGlob("./site/article/*.md").filter(livePosts)
    ].reverse();
  });

  config.addCollection("notes", collection => {
    return [
      ...collection.getFilteredByGlob("./site/notes/*.md").filter(livePosts)
    ].reverse();
  });

  // TODO what is postfeed?
  config.addCollection("postFeed", collection => {
    return [
        ...collection.getFilteredByGlob("./site/article/*.md").filter(livePosts)
      ]
      .reverse()
      .slice(0, site.postsPerPage);
  });

  // Passthrough
  config.addPassthroughCopy({
    "site/static": "/"
  });
  config.addPassthroughCopy({
    "site/src/fonts": "/fonts"
  });
  config.addPassthroughCopy({
    "site/static/img": "/img"
  });

  // Plugins
  config.addPlugin(rssPlugin);
  // config.addPlugin(syntaxHighlight);

  // Watch for changes to my source files
  if (config.addWatchTarget) {
    config.addWatchTarget("site/src/scss");
    config.addWatchTarget("site/src/js");
    config.addWatchTarget("site/src/fonts");
  } else {
    console.log(
      "A future version of 11ty will allow live-reloading of JS and Sass. You can update 11ty with the next release to get these features."
    );
  }

  return {
    dir: {
      input: "site",
      output: "dist"
    },
    passthroughFileCopy: true
  };
};