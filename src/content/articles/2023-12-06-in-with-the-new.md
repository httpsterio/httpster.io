---
title: In with the new, out with the old
date: "2023-12-30"
description: "After three and a half years, it's time for a refresh."
writingtime: "4 hours"
draft: true
tags:
  - webdev
---

## Time for a site refresh

After three and a half years exactly, I think it was time to rewrite my site. _I know, I know_, it's basically a meme at this point, webdevs rewriting their personal site and never updating it after that. But, my skills, needs and wants have changed over time and I felt like my site was keeping me from creating content and I felt it was justified in recreating it.

This is a pretty long blog post, you've been warned!

## The previous site

The previous version of this site had been based on a fork of Mike Riethmuller's [Supermaya](https://github.com/MadeByMike/supermaya) Eleventy starter project. Eleventy was still pretty new at the time and there weren't a ton of starter projects available. Supermaya kinda hit the sweet spot for me, being just enough fleshed out to get me going, but at the same it didn't get too much in the way, which is why I originally picked it.

Supermaya was by no means perfect. I found a handful of layout issues, some markup errors with regards to accessibility and even a few bugs related to images. That's all to be expected. Supermaya also shipped with integrations for a CMS called KeystoneJS, which I effectively tore out. I also removed stuff related to inlining CSS above the fold as headless browsers don't tend to play nicely with WSL and I wanted to simplify the site so that it'd be easier to get an actual understanding of how it all works. After a couple of days, I had my site up and running and over the next week, I kept optimizing and fixing things.

After some point, Mike stopped supporting and updating the site and my pull requests didn't get merged. As it's FOSS, I have no expectations of the sorts anyways. I personally didn't need anything from him either but as a starter template, I'd consider it archived and maybe not the best way forward. Eventually the site broke with the latest Node.js LTS version and upgrading it ended up really hacky. I did finally manage to migrate it to Eleventy 2.0 and Node.js 18, but after all my fixes and edits, the code started to be cumbersome to maintain. 

The biggest issue for me personally though was the fact that Mike has some very specific way of writing CSS layouts and I didn't fully ever understand it. There was a lot of really elegant solutions and you could easily tell that Mike's way of working was miles ahead of what I'm personally capable of. My code isn't really maintainable or future proof as I'm kinda mixing two paradigms. So, I decided to start anew.

## Experimentations

Before rebuilding my site, I personally went through some life events. We got married with my wife just over a year ago and I needed to write up a photo gallery website for our wedding photos. I built the site from scratch with Eleventy and bash and made a starter project out of it, which is available [here!](https://11ty-gallery.netlify.app) This was actually a really fun and teaching project, although generating json with bash the way I did it is literally the silliest way and shouldn't be replicated.

I also needed to build a couple of other sites and found an Eleventy starter by Rong Ying, which I then forked into another starter project that can be found [here](https://11ty-blog-njk-starter.netlify.app). This was my first time experimenting with Tailwind and while I don't love it, it does solve a lot of issues I had with creating layouts and I've opted to use it in my other projects since. I managed to find a handful of bugs in Rong Ying's starter and I migrated the original project from Liquid to Nunjucks. I spent a good while on re-learning about templating, pagination and Liquid/NJK filters and functions.

## Time for a redo

