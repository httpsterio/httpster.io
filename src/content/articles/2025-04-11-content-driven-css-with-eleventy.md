---
title: Generating content driven CSS with Eleventy
date: "2025-04-11"
description: "I didn't have wheels of steel."
writingtime: "1 hour"
draft: true
tags:
  - life
socialimage: "/assets/images/articles/2025/cover-wheel-woes.jpg"
sharedlink: 
  - "https://social.lol/@sami/113877697157842980"
---

If you've ever taken a peek at my [content stream](/main), you'll know that I use an assortment of colors to denote post categories.

In my case, it was rather trivial to achieve in the end, once you have an understanding of the data cascade and how to utilize template files. I'll demonstrate how I did it.

## Directory data files

My content is separated into sub-folders. I have a `src/content/$content-type` layout for my categories, `$content-type` being my folders for the categories like `articles` or `projects`. 

If you create a `folder-name.json` file inside the similarily named directory, you can use that json file to prepopulate your YAML frontmatter. This means, you don't have to type `category: article` for every post you have. It's pretty nice. This is what my `projects.json` looks like:

{% raw %}
```json
{
  "layout": "post",
  "category": "project",
  "permalink": "//project/{{ title | slugify }}/index.html",
  "type": "item-project",
  "theme": ["blue", "light"]
}
```
{% endraw %}
