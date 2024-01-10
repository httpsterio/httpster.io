const { filterdrafts } = require('../filters');

/** All blog posts as a collection. */
const getAllPosts = collection => {
  const projects = collection.getFilteredByGlob('./src/posts/*.md');
  return filterdrafts(projects).reverse();
};

/** All markdown files as a collection for sitemap.xml */
const onlyMarkdown = collection => {
  const onlyMarkdownContent =  collection.getFilteredByGlob('./src/**/*.md');
  return filterdrafts(onlyMarkdownContent).reverse();
};

const articleCollection = collection => {
  const articles = collection.getFilteredByGlob('./src/content/articles/*.md');
  return filterdrafts(articles).reverse();
};

const coffeeCollection = collection => {
  const coffee = collection.getFilteredByGlob('./src/content/coffee/*.md');
  return filterdrafts(coffee).reverse();
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
  mainCollection
};
