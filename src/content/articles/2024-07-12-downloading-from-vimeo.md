---
title: Downloading embedded videos from Vimeo
date: "2024-07-08"
description: "yt-dlp to the rescue!"
writingtime: "1 hour"
draft: true
tags:
  - tech
  - guide
socialimage: "/assets/images/articles/2024/cover interweb-sucks.jpg"
sharedlink: 
  - https://social.lol/@sami/112748686616645989
---

## Intro
First off, I want to stress that this __is not__ a guide on how to pirate videos. I'm writing this as a guide on how to download embedded Vimeo videos in order to archive and preserve digital content that might disappear.

You should always aim to buy and support the creators. This guide is meant for those cases when you can't buy or otherwise publicly access a video that you consider being at risk of disappearing from the internet forever.

## Prerequisites

You'll need a couple of things to get started.

The main software we're depending on is [yt-dlp](https://github.com/yt-dlp/yt-dlp), currently the latest stable version is 2024.07.09



```html
<iframe src="https://player.vimeo.com/video/666666666?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="horse_loop"></iframe>


<script src="https://player.vimeo.com/api/player.js"></script>


<iframe src="https://embed.vhx.tv/videos/1655514?api=1&amp;autoplay=1&amp;color=850910&amp;context=https%3A%2F%2Ftaskmastersupermaxplus.vhx.tv%2Fbrowse&amp;is_trailer=false&amp;live=0&amp;locale=en&amp;playsinline=1&amp;referrer=https%3A%2F%2Ftaskmastersupermaxplus.vhx.tv%2Fbrowse&amp;vimeo=1" allow="encrypted-media; autoplay; fullscreen" id="watch-embed" class="sticky-player-child embed-content border-reset">
</iframe>
```