# Eleventy Excellent

Easy to use Eleventy starter, based on the workflow suggested by Andy Bell's [buildexcellentwebsit.es](https://buildexcellentwebsit.es/).

If you end up using this starter, feel free to send me a link, I'd love to see it!
Also let me know if you miss any features. Currently in planning: dark mode, inlining CSS and JS.

## Features

**This starter includes:**

- The whole CSS workflow as suggested by buildexcellentwebsit.es
- Accessible site navigation, editable in `src/_data/navigation.js`
- Image optimization with Eleventy-img _([see blog post](https://eleventy-excellent.netlify.app/blog/post-with-an-image/))_
- Youtube embed with lite-youtube _([see blog post](https://eleventy-excellent.netlify.app/blog/post-with-a-video/))_
- Easy resource fetching with eleventy-fetch _([see blog post](https://eleventy-excellent.netlify.app/blog/post-with-fetched-content/))_
- Syntax highlighting via eleventy-plugin-syntaxhighlight _([see blog post](https://eleventy-excellent.netlify.app/blog/post-with-some-code/))_
- Advanced markdown handling _([see blog post](https://eleventy-excellent.netlify.app/blog/post-with-all-the-markdown/))_
- 301 redirects for Netlify _([see blog post](https://eleventy-excellent.netlify.app/blog/post-with-301-redirects/))_
- Automatically generated Open Graph images for blog posts _([see blog post](https://eleventy-excellent.netlify.app/blog/open-graph-images/))_
- More features in seperate demo branches _([see blog post](https://eleventy-excellent.netlify.app/blog/demo-pages/))_
- SEO basics (XML-sitemap, metadata)
- dayjs handling dates & times
- Bundling via esbuild
- RSS feed
- Links to social networks in footer
- Mastodon domain verification snippet

## First steps

[Please read the Get started docs!](https://eleventy-excellent.netlify.app/get-started/)

## Deploy directly to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/madrilene/eleventy-excellent)

## Development

### Install dependencies

```
npm install
```

### Working locally

Starts watch tasks to compile when changes detected

```
npm start
```

### Creating a production build

Minify JS, CSS and HTML.

```
npm run build
```

## Built with Eleventy Excellent

[Sites that are based on / built with Eleventy Excellent. ](https://eleventy-excellent.netlify.app/built-with/)
Add your site by submitting a pull request! :)

## Logbook

**23-10-30**

- Overall updates
- New blog post: demo pages

**23-05-23**

There was a weird error on Chrome with flex-wrap in the menus. Also, I updated all sizing properties to logical properties. Instead of featuring the sites built with Eleventy Excellent in the README, I created [a page for it](https://eleventy-excellent.netlify.app/built-with/). Same goes for [Getting started](https://eleventy-excellent.netlify.app/get-started/). I deleted the Netlify a11y plugin, as it seems unmaintained.

**23-03-24**

Extended the "Images" blog post with an example with custom `sizes` attribute and explained where the CSS can be adjusted.

**23-01-26**

- Replaced Heydon's redundant click event for cards with his pseudo-content trick solution so we don't lose the context menu.

  \- https://inclusive-components.design/cards/#theredundantclickevent

  \+ https://inclusive-components.design/cards/#thepseudocontenttrick

**23-01-25**

- updated Eleventy
- minor: added automatically generated open graph images for blog posts

**23-01-09**

- updated Eleventy
- added package version number in footer

**22-12-29**

- updated Eleventy
- minor: changed CSS for header, not using the sidebar solution anymore. sidebar.css thus deleted. Now the focus for the logo section doesn't expand all the way to the menu anymore.
- Updated and added some `rel` values after reading Alvaro Montoro's excellent article [A Theory of Web Relativity](https://www.htmhell.dev/adventcalendar/2022/21/).
- stripped "noreferrer" from external links in markdown (editable in `config/plugins/markdown.js`), because I don't mind the target page of carefully placed links to identify the source of the reference.
- added two more pages to the 'built with' section, yay!
- Thought: Now that actually some websites in production are based on this starter, should I create formal release notes?

**22-12-20**

- Andy now links to his mastodon profile
- Linked blog posts in readme

**22-12-13**

- added JS and CSS as as first-class citizens in Eleventy, out of the npm scripts.
- imported htmlmin transform, css and js processing with `eleventyConfig.addPlugin(require("other-config-file.js"))`, see https://front-end.social/@eleventy@fosstodon.org/109501433721579265

**22-12-12**

- updated head structure for better performance
- added "built with this" section in readme
- added note for internal links in markdown blog post
- adding page based preload option, making preload of monospaced font in posts default to avoid CLS

**22-11-24**

- updated required node version in package.json
- meta.js now controls most of the templates defaults
- added RSS feed, because of course!!
- made twitter and other meta data OPTIONAL
- added Mastodon verification and more social icon defaults
- focus-within for the cards

**22-11-04**

- added blog posts for feature explanation

**22-10-30**

- WebC in own branch
- simplify main branch

**22-10-04**

- all markdown syntax set

**22-10-03**

- first commit. Updated

## Credits and Thank yous

**Andy Bell**

His CSS methodology "CUBE" makes sense to me. It goes hand in hand with _Every Layout_ (which he co-authors). He has recently published an approach that incorporates Tailwind CSS into his methodology. Also, I learned how to use Eleventy in 2020 with his (now free) course.

- https://buildexcellentwebsit.es/
- https://cube.fyi/
- https://learneleventyfromscratch.com/

**Heydon Pickering**

I strongly orientate myself on Heydon's approaches and really love his books.

- https://every-layout.dev/
- https://inclusive-components.design/

**Zach Leatherman**

He is developing Eleventy and is constantly making it even better!

- https://www.11ty.dev/
- https://www.zachleat.com/

**Stephanie Eckles**

Stephanie provides a lot of resources for Eleventy and modern CSS.

- https://smolcss.dev/
- https://moderncss.dev/

**Aleksandr Hovhannisyan**

I love order and structure. Aleksandr does this in an exemplary way, which is why I based the structure of eleventy.js on his personal site. The 301 redirect solution I'm using is from his blog.

- https://github.com/AleksandrHovhannisyan
- https://www.aleksandrhovhannisyan.com/blog/eleventy-netlify-redirects/

**Manuel Matuzović**

Manuel is an accessibility expert. The menu I'm using is from one of his articles on web.dev.

- https://web.dev/website-navigation/
- https://www.matuzo.at/

**Bernard Nijenhuis**

Bernard wrote the article on which the Open Graph Images implementation is based.

- https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/
