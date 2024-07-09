---
title: In with the new, out with the old
date: "2024-01-01"
description: "After three and a half years, it's time for a refresh."
writingtime: "4 hours"
draft: false
tags:
  - tech
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

As I've said earlier, my previous websites had some issues that I wanted to avoid this time around. I'm under no illusion that this site would be the last one I'd ever make, but I would like for the content to be portable more easily and manageable for a longer while. I'm planning on generating, storing and displaying multiple kinds of data within one website and utilize this data in multiple ways. 

Things I'm trying to avoid are 

1. baking content and data into the markup code, these should be kept separate

2. inheriting too much code I don't fully understand myself.

Originally, I planned on writing my new site from scratch with Eleventy and Tailwind and stealing solutions from different templates and projects to solve each individual function. After too much mulling about and planning without actually doing anything, I came across Lene Saile's [Eleventy Excellent](https://github.com/madrilene/eleventy-excellent) starter project and just simply went with that as a base.

Lene's starter does a lot of very smart things, which at times make my life a lot easier and solve issues I couldn't figure out myself and occasionally bites myself in the ass. After starting to work with the starter template I was contemplating a few times if I should abandon it and go with my original plan, but I decided to stick it out. And I'm glad I did.

The starter project is very well structured and every feature and config is implemented in a way that's quite easy to just replace or rip out entirely if I would choose to. Most of the _"black magic"_ isn't done on the layout end of things and it comes with very little CSS so there isn't any major paradigms I need to grok, so I feel this is a pretty safe base to start building on.

As always, there's a handful of bugs to fix, most of which are of my own making. I think that's okay though. I'm not aiming for perfection and I don't mind the site being published in a half-finished state as long as it's usable. I'd rather just keep on occasionally working on it and at least have _something_ presentable released.

## For the future

I don't have a publicly documented laundry list of things I've planned for the site, I'm just going to go with the flow and work on whatever inspires me. I'm trying to track the evolution of the site on the [Changelog](/changelog/) page. My main focus for now is simply to start writing more. 

Ideally, I'd get webmentions and comments integrated soon-ish, simply to encourage interaction and possibly garner some kind of readership. Despite working in marketing, I don't really want to push my content though, that's not within the _raison d'etre_ so I can't say I'm too bothered. I would like to indiewebify my online presence a bit more, but it's still a world I don't fully understand. That's the way forward though in my opinion.

If you, dear reader, encounter some weird bugs or simply want to say 'hi', you should send me a message on Mastodon :) Have a great start of the year, cheers!

