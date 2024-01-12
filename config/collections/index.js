const { filterdrafts } = require('../filters');

/** All blog posts as a collection. */
const getAllPosts = collection => {
  return filterdrafts(collection.getFilteredByGlob('./src/content/*/*.md')).reverse();
};

/** All markdown files as a collection for sitemap.xml */
const onlyMarkdown = collection => {
  return filterdrafts(collection.getFilteredByGlob('./src/**/*.md')).reverse();
};

const articleCollection = collection => {
  return filterdrafts(collection.getFilteredByGlob('./src/content/articles/*.md')).reverse();
};

const coffeeCollection = collection => {
  return filterdrafts(collection.getFilteredByGlob('./src/content/coffee/*.md')).reverse();
};

const mainstreamCollection = collection => {
  return filterdrafts(collection.getFilteredByGlob('./src/content/mainstream/*.md')).reverse();
};

const mainCollection = collection => {
  const articles = collection.getFilteredByGlob('./src/content/articles/*.md');
  const coffee = collection.getFilteredByGlob('./src/content/coffee/*.md');
  const mainContent = articles.concat(coffee);
  return filterdrafts(mainContent).reverse();
};

module.exports = {
  getAllPosts,
  onlyMarkdown,
  articleCollection,
  coffeeCollection,
  mainstreamCollection,
  mainCollection
};
