---
title: Generating content driven CSS with Eleventy
date: "2025-04-11"
description: "Why spend an hour writing CSS when you can spend four hours to create classes on the fly?"
writingtime: "1 hour"
draft: false
tags:
  - CSS
  - NJK
  - JS
  - Eleventy
socialimage: "/assets/images/articles/2025/cover-content-css.jpg"
---

If you've ever taken a peek at my [content stream](/main), you'll know that I use an assortment of colours to denote post categories.

It took me a while to nail down how to achieve it. Creating the feature was surprisingly simple though once I had an understanding of the data cascade and how to utilize template files. 

The first version used hard-coded templates for each post type. The second version loaded different post types dynamically based on category. Third version inlined dynamically created classes (which meant a lot of duplicated inline CSS) and my latest iteration now creates the classes needed on the fly and everything only gets created once. 

I'll demonstrate how I did it.

## Directory data files

Eleventy has a handy thing called Directory data files[^1]. They're JSON or JS files that can either compute or apply static values to the files in your directories.

My content is separated into sub-folders. I have a `src/content/$content-type` layout for my categories, `$content-type` being my folders for the categories like `articles` or `projects`. 

If you create a `folder-name.json` file inside the similarily named directory, you can use that json file to prepopulate your YAML front matter. This means, you don't have to type `category: article` for every post you have. It's pretty nice. This is what my `projects.json` looks like:

{% raw %}
```json
{
  "layout": "post",
  "category": "project",
  "permalink": "//project/{{ title | slugify }}/index.html",
  "theme": ["blue", "light"]
}
```
{% endraw %}

So, this means that every post that is in `src/content/projects/` will get the specified layout, category, permalink and theme automatically set in the front matter for each post.

> __n.b.__ remember the data cascade[^2]. If you set a value in your front matter in both the directory data file as well as the front matter in your layouts, the directory file will override the values. Use eleventyComputed to override the directory data file values.

## CSS Variables

In the JSON example above, I set a key value pair called __theme__ with an array as the value. This means that in my layouts I can use either `theme[0]` and `theme[1]` or `post.data.theme[0]` and `post.data.theme[1]` to access the values set. You could have more values or just one. If you're using just one, you don't need an array, you can simply give it a string value as well. 

In my case, the colour `blue` and `light` are definied as a CSS variables and I'm only using colours I've already named and defined in the CSS like so:

```css
:root {
  --colour-dark: #0c0c0c;
  --colour-light: #F3F3F3;
  --colour-red: #e5633e;
  --colour-turquoise: #1ed397;
  --colour-green: #59D376;
  --colour-yellow: #fdb320 ;
  --colour-tangerine: #f18b2f;
  --colour-orange: #f79f28;
  --colour-blue: #1E29F9;
  --colour-purple: #4f0eb8;
}
```

Now, for the fun parts!

## Template file as CSS and dynamic CSS

The cool thing about Eleventy is the way you can manipulate data and files. CSS is just text and template files are just text as well. As long as you're properly formatting your templates, you can use any template language Eleventy supports to slurp up all of the data you need and generate files based on that.

I'm using Nunjucks files as that's what I'm most familiar with, but I'd recommend going with `.11ty.js` files for their flexibility.

I made a `themes.css.11ty.js` file and it looks like this:

<details>
<summary>themes.css.11ty.js</summary>

{% raw %}
```css
module.exports = class {
  data() {
    return {
      permalink: "/assets/css/themes.css",
      eleventyExcludeFromCollections: true,
    };
  }

  render({ collections }) {
    const seen = new Set();
    const themeValues = [];

    for (const post of collections.posts) {
      const theme = post.data.theme;
      if (Array.isArray(theme)) {
        const key = theme.join("-");
        if (!seen.has(key)) {
          seen.add(key);
          themeValues.push(theme);
        }
      }
    }

    return themeValues.map(theme => {
      return `
.theme-${theme[0]} {
  border-color: var(--color-${theme[0]});
  color: var(--color-${theme[1]});
  background-color: var(--color-${theme[0]});
}

.theme-${theme[0]}:hover,
.theme-${theme[0]}:focus-within {
  border-color: var(--color-${theme[1]});
  box-shadow: 0.75rem -0.75rem 0 0 var(--color-dark), -0.75rem 0.75rem 0 0 var(--color-${theme[0]});
}

.theme-${theme[0]}::selection {
  color: var(--color-${theme[0]});
  background-color: var(--color-${theme[1]});
}

.theme-${theme[0]}-post-tag {
  color: var(--color-${theme[0]});
  background: var(--color-${theme[1]});
}
      `.trim();
    }).join("\n\n");
  }
};

```
{% endraw %}

</details>

<details>
<summary>themes.css.njk</summary>

{% raw %}
```js
---
permalink: "/assets/css/themes.css"
eleventyExcludeFromCollections: true
---
{% set seenThemes = [] %}
{% set uniqueThemes = [] %}

{% for post in collections.posts %}
  {% if post.data.theme %}
    {% set key = post.data.theme | join('-') %}
    {% if not (key in seenThemes) %}
      {% set seenThemes = seenThemes.concat([key]) %}
      {% set uniqueThemes = uniqueThemes.concat([post.data.theme]) %}
    {% endif %}
  {% endif %}
{% endfor %}
{% for theme in uniqueThemes %}

.theme-{{ theme[0] }} {
  colour: var(--colour-{{ theme[1] }});
  background-colour: var(--colour-{{ theme[0] }});
}

.theme-{{ theme[0] }}:hover {
  border-colour: var(--colour-{{ theme[1] }});
  box-shadow: 1rem var(--colour-{{ theme[0] }});
}

{% endfor %}
```
{% endraw %}
</details>

_In short what the snippet above does:_

- Create a file called themes.css
- Store the theme keys and values
- Loop through the collections.posts and store each unique theme
- For each unique theme, create a theme-$name class and use the theme[0] and theme[1] values for CSS 

This will render out to a regular CSS file with all of your themes as their own classes, but you could even take it one step further.

You could even use a {% raw %}`{% if theme[1] == "dark" %}`{% endraw %} block to create separate CSS for those themes that work with dark colours and those that work with light colours for example. Or you could randomize the colour values to create a random assortment of themes on each build!

## Using the CSS

Now it's time to actually use the CSS we just created.

First off, you'll want to include the created file. I also have added a hashing function to cache bust the file between builds.

{% raw %}
  ```html
    {% set assetHash = global.random() %}
    <link rel="stylesheet" href="/assets/css/themes.css?{{ assetHash }}" />
  ```
{% endraw %}

In my Nunjucks template I can now access the CSS classes like so

{% raw %}
  ```html
  <article class="{% if post.data.theme %}theme-{{ post.data.theme[0] }}{% endif %}"></article>
  ```
{% endraw %}

So in the case of my projects, we're checking if the project file returns a theme value and then we add the `theme-blue` class to the article.

Remember that if you're not using themes for all of the content, you'll need a higher specifity in your classes to override the defaults. My articles have a fallback theme and only if I have set a custom theme in the post, will we be using that.

## End words

Eleventy can really be such a delight to work with and it's stuff like this that keeps me coming back to it all the time.

Hopefully my sort-of tutorial inspires you to experiment with using data and templates to create dynamic CSS on the fly. I'm excited to see what you all come up with!

Ta ta and farewell!

## Notes

[^1]: [https://www.11ty.dev/docs/data-template-dir/](https://www.11ty.dev/docs/data-template-dir/)

[^2]: [https://www.11ty.dev/docs/layouts/#sources-of-data](https://www.11ty.dev/docs/layouts/#sources-of-data)