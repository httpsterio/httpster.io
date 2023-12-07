const { filterdrafts } = require('../filters');

/** All blog posts as a collection. */
const getAllPosts = collection => {
  const now = new Date();
  const publishedPost = post => post.date <= now && !post.data.draft;
  const projects = collection.getFilteredByGlob('./src/posts/*.md').filter(publishedPost);
  return projects.reverse();
};

/** All markdown files as a collection for sitemap.xml */
const onlyMarkdown = collection => {
  return collection.getFilteredByGlob('./src/**/*.md');
};

const articleCollection = collection => {
  const articles = collection.getFilteredByGlob('./src/content/articles/*.md');
  return filterdrafts(articles).reverse();
};

module.exports = {
  getAllPosts,
  onlyMarkdown,
  articleCollection
};
