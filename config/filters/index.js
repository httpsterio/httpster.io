const dayjs = require('dayjs');
const md = require('markdown-it')();

const stripHttps = url => {
  return url.replace('https://', '');
}

/** Converts the given date string to ISO8610 format. */
const toISOString = dateString => dayjs(dateString).toISOString();

/** Formats a date using dayjs's conventions: https://day.js.org/docs/en/display/format */
const formatDate = (date, format) => dayjs(date).format(format);

const yearsSinceDate = (postDate) => {
  var now = dayjs().year();
  var postYear = dayjs(postDate).year();
  return now - postYear;
};

const yearsSinceYear = (postDate) => {
  const now = new Date().getFullYear(); // Get the current year
  const postYear = parseInt(postDate, 10); // Parse the postDate string as an integer
  return now - postYear; // Return the difference
};

/**
 * Render content as inline markdown if single line, or full
 * markdown if multiline. for md in yaml
 * @param {string} [content]
 * @param {import('markdown-it').Options} [opts]
 * @return {string|undefined}
 */

const mdInline = (content, opts) => {
  if (!content) {
    return;
  }

  if (opts) {
    md.set(opts);
  }

  let inline = !content.includes('\n');

  // If there's quite a bit of content, we want to make sure
  // it's marked up for readability purposes
  if (inline && content.length > 200) {
    inline = false;
  }

  return inline ? md.renderInline(content) : md.render(content);
};

const filterdrafts = collection => {
  const now = new Date();
  if (process.env.ELEVENTY_ENV == 'production'){
    return collection.filter(post => post.date <= now && !post.data.draft);}
  else {
    return collection.filter(post => post.date <= now);}
};

module.exports = {
  toISOString,
  formatDate,
  stripHttps,
  yearsSinceDate,
  yearsSinceYear,
  mdInline,
  filterdrafts
};
