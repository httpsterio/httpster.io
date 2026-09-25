/**
 * I strive to keep the `.eleventy.js` file clean and uncluttered. Most adjustments must be made in:
 *  - `./config/collections/index.js`
 *  - `./config/filters/index.js`
 *  - `./config/plugins/index.js`
 *  - `./config/shortcodes/index.js`
 *  - `./config/transforms/index.js`
 */

// JSDoc comment: Hint VS Code for eleventyConfig autocompletion. © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf

/**
 *  @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig
 */

// get package.json
const packageVersion = require('./package.json').version;

// module import filters
const {
  toISOString,
  formatDate,
  stripHttps,
  yearsSinceDate,
  yearsSinceYear,
  mdInline
} = require('./config/filters/index.js');

// module import shortcodes
const {
  includeRaw,
} = require('./config/shortcodes/index.js');

// module import collections
const {
  getAllPosts,
  onlyMarkdown,
  articleCollection,
  coffeeCollection,
  mainstreamCollection,
  reviewCollection,
  projectCollection,
  mainCollection
} = require('./config/collections/index.js');

// module import events
// const {svgToJpeg} = require('./config/events/index.js');

// plugins
const markdownLib = require('./config/plugins/markdown.js');
const {EleventyRenderPlugin} = require('@11ty/eleventy');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const {slugifyString} = require('./config/utils');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const bundlerPlugin = require('@11ty/eleventy-plugin-bundle');
const {imageTransformPlugin} = require('@11ty/eleventy-img');
const fs = require('fs');
const path = require('path');

module.exports = eleventyConfig => {

  // 	--------------------- Custom Watch Targets -----------------------
  eleventyConfig.addWatchTarget('./src/assets');
  eleventyConfig.addWatchTarget('./utils/*.js');

  // --------------------- layout aliases -----------------------
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('home', 'home.njk');
  eleventyConfig.addLayoutAlias('blog', 'blog.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');

  // 	---------------------  Custom filters -----------------------
  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('formatDate', formatDate);
  eleventyConfig.addFilter('stripHttps', stripHttps);
  eleventyConfig.addFilter('slugify', slugifyString);
  eleventyConfig.addFilter('yearsSinceDate', yearsSinceDate);
  eleventyConfig.addFilter('yearsSinceYear', yearsSinceYear);
  eleventyConfig.addFilter('md', mdInline);

  const util = require('util');
  eleventyConfig.addFilter('console', value => `<div style="white-space: pre-wrap;">${decodeURIComponent(util.inspect(value))}</div>;`);
  

  // 	--------------------- Custom shortcodes ---------------------
  eleventyConfig.addShortcode('include_raw', includeRaw);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`); // current year, stephanie eckles
  eleventyConfig.addShortcode('packageVersion', () => ` v${packageVersion}`);

  // 	--------------------- Custom transforms ---------------------
  // eleventyConfig.addPlugin(require('./config/transforms/html-config.js'));

  // 	--------------------- Custom Template Languages ---------------------
  eleventyConfig.addPlugin(require('./config/template-languages/css-config.js'));
  eleventyConfig.addPlugin(require('./config/template-languages/js-config.js'));

  // 	--------------------- NJK settings ---------------------
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: false,
    trimBlocks: true,
    lstripBlocks: true
  });
  // 	--------------------- Custom collections -----------------------
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('onlyMarkdown', onlyMarkdown);
  eleventyConfig.addCollection('articles', articleCollection);
  eleventyConfig.addCollection('coffee', coffeeCollection);
  eleventyConfig.addCollection('mainstream', mainstreamCollection);
  eleventyConfig.addCollection('reviews', reviewCollection);
  eleventyConfig.addCollection('projects', projectCollection);
  eleventyConfig.addCollection('mainContent', mainCollection);

  // 	--------------------- Drafts & scheduled posts ---------------------
  // In a real build (not --serve), skip drafts and future-dated posts entirely: no page, no collections, no feeds
  eleventyConfig.addPreprocessor('drafts', 'md', data => {
    if (process.env.ELEVENTY_RUN_MODE !== 'build') return;
    if (data.draft || data.page.date > new Date()) return false;
  });

  // 	--------------------- Events ---------------------
  // eleventyConfig.on('afterBuild', svgToJpeg);

  // 	--------------------- Plugins ---------------------
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.setLibrary('md', markdownLib);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(bundlerPlugin);

  // Rewrites every <img> into a responsive <picture> (avif + webp, several widths). Add `eleventy:ignore` to an <img> to skip it
  eleventyConfig.addPlugin(imageTransformPlugin, {
    formats: ['avif', 'webp'],
    widths: [320, 570, 880, 1200],
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async',
        sizes: '(min-width: 55rem) 880px, 100vw'
      }
    }
  });

  // Copy each post's original images next to its page, so feed readers (which get the plain post HTML) can load them
  eleventyConfig.on('eleventy.after', ({results}) => {
    for (const {inputPath, outputPath} of results) {
      if (!inputPath.startsWith('./src/content/') || !outputPath) continue;
      const from = path.dirname(inputPath);
      const to = path.dirname(outputPath);
      for (const file of fs.readdirSync(from)) {
        if (/\.(jpe?g|png|webp|gif|avif)$/i.test(file)) {
          fs.copyFileSync(path.join(from, file), path.join(to, file));
        }
      }
    }
  });

  // 	--------------------- Passthrough File Copy -----------------------
  // same path
  ['src/assets/fonts/', 'src/assets/images/', 'src/assets/media/'].forEach(path =>
    eleventyConfig.addPassthroughCopy(path)
  );

  // social icons to root directory
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/'
  });

  eleventyConfig.addPassthroughCopy({
    'src/assets/stats/script.js': '/stats/script.js'
  });

  eleventyConfig.addPassthroughCopy({
    'src/assets/stats/neatstats.well-known': '/.well-known/neatstats'
  });

  // 	--------------------- general config -----------------------
  return {
    // Pre-process *.md, *.html and global data files files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    // Optional (default is set): If your site deploys to a subdirectory, change `pathPrefix`, for example with with GitHub pages
    pathPrefix: '/',

    dir: {
      output: 'dist',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};
