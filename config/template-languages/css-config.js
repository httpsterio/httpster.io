// CSS and JavaScript as first-class citizens in Eleventy: https://pepelsbey.dev/articles/eleventy-css-js/

const postcss = require('postcss');
const postcssImport = require('postcss-import');
const postcssImportExtGlob = require('postcss-import-ext-glob');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = eleventyConfig => {
  eleventyConfig.addTemplateFormats('css');

  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compile: async (content, path) => {
      if (path !== './src/assets/css/global.css') {
        return;
      }

      return async () => {
        const plugins = [
          postcssImportExtGlob,
          postcssImport,
          tailwindcss,
        ];

        if (process.env.NODE_ENV === 'production') {
          plugins.push(autoprefixer);
          plugins.push(cssnano);
        }

        let output = await postcss(plugins).process(content, {
          from: path
        });

        return output.css;
      };
    }
  });
};
