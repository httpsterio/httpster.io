---
title: Self-hosting Umami for free
date: "2024-01-29"
description: "Privacy friendly analytics don't have to break the bank."
writingtime: ""
draft: true
tags:
  - webdev
  - tech
  - guide
sharedlink:
---

If you don't want to read all the stuff leading up to the install instructions, you should skip to [Installing Umami](#installing-umami) or the [#TL;DR](#tl;dr).


## Intro
Web analytics can be rather useful. They help you form an understanding of your users, how many there are and where they come from, which can help you plan and optimize your content, if you so desire.

I don't really care about that myself, but I have to admit that it feels good to see the viewcounters go up. _I am vain, I know_.

## The good and the bad
I think I can guess what you're thinking.

_"Web analytics. Eughhh! I don't want to add an ugly-ass cookie banner and sell my user's data to $BIG CORP Ltd."_.

Cookie banners would be necessary, if you'd use something like Hotjar, Heap, or _\*shudder\*_ Google Analytics. Corporations offer you these tools for your convenience at either a hefty fee or at the cost of your users' data. Sometimes both.

Fear not, though! If you don't collect and store identifiable information on your users, you don't need to add those pesky cookies and banners that they go with. Lately, these types of analytics services have started to pop up. The downside with these, is the fact that you get less information on your users, but your users will likely consider that a plus. I do at least.

You'll also want to avoid services that sell or share your user data with 3rd parties like Google and Facebook does.

Plausible[^1] and Fathom[^2] are some really solid options, if you don't mind spending some dough. GoatCounter[^3] and Umami[^4] are great, if you can only spend a little bit or are looking for a generous free tier. I used GoatCounter for a while and really enjoyed it, but in the end I moved to Umami for reasons I'll explain a bit later!

If you want to tell your users to go fuck themselves, you could also pay for something like Hotjar or Fullstory or just use Google Analytics. But, that'd be kinda disrespectful I think? Yeah, don't do that.

## To self host or not

The nice thing with Umami, GoatCounter, Fathom and Plausible is the fact that they're open source and offer the option to self host your analytics.

I was initially happy with GoatCounter as a hosted service, but in the end I didn't want to log my users' info in a database I can't control. I respect you people too much. So, I self-hosted GoatCounter for a while on my home server. It's really simple to set up and it's essentially just a go binary that you run and open a port for and it's also very fast and lightweight.

But, I don't trust myself enough to secure the server with public facing projects and the server is literally in my home network, which was a tad too much of a security risk in my opinion. I also didn't really want to pay for analytics, they're not that important to me, so renting a server wasn't an option either.

Lucky me, Umami can be run on Vercel's free tier as it is mainly a static Next.js application with a Postgres database and that's it. So let's see how that's done!

## Installing Umami



### Getting started

You need two things before we get started. 

1. You'll need an account on GitHub, GitLab or Bitbucket

2. An account on Vercel

For me, GitHub is the most familiar one and the Umami repository is there as well so it's easier to use that in my opinion. Free tier on both GitHub and Vercel is enough. 

### Forking
Once you have your GitHub account set up, go to the Umami repository https://github.com/umami-software/umami and hit the ___"fork"___ button on the top. Give the fork a name, you can leave everything on default settings and then just hit ___"Create fork"___. Keep the tab open.

<figure class="mb-xl">
  <img src="/assets/images/articles/2024/umami/umami fork.webp" alt="Screenshot of Github's UI with the fork-button hilighted" title="Screenshot of Github's UI with the fork-button hilighted" />
  <figcaption>Slam that fork button, yo!</figcaption>
</figure>

### Creating the database
Now, log into Vercel or create your account if you haven't.

If you're greeted with the "Let's build something new" page with the option to import a project from Git, don't do that just yet! ___Click your name on the top left___ to get to the actual homepage of your projects.

<figure class="mb-xl">
  <img src="/assets/images/articles/2024/umami/vercel main.webp" alt="Screenshot of Vercel's UI with user's name in the top nav hilighted" title="Screenshot of Vercel's UI with user's name in the top nav hilighted" />
  <figcaption>Go to the main page.</figcaption>
</figure>

Then, go to ___"Storage"___ and create a new ___"Postgres"___ database.

<figure class="mb-xl">
  <img src="/assets/images/articles/2024/umami/vercel storage.webp" alt="Screenshot of Vercel's UI with the navigation item storage hilighted and Create button for Postgres hilighted" title="Screenshot of Vercel's UI with the navigation item storage hilighted and Create button for Postgres hilighted" />
  <figcaption>Let's make a database!</figcaption>
</figure>

Read the terms and pinky promise you won't abuse the free service. Now, give a name to the database and select the region that's closest to you. In my case, that'd be Germany. Hit ___"Create"___ and give it a sec.

<figure class="mb-xl">
  <img src="/assets/images/articles/2024/umami/vercel database settings.webp" alt="Screenshot of Vercel's UI with an example configuration for the database name and region" title="Screenshot of Vercel's UI with an example configuration for the database name and region" />
  <figcaption>Let's go!</figcaption>
</figure>

Now that the databse is created, you'll want to select ___".env.local"___ and copy the ___"POSTGRES_PRISMA_URL"___.

__Make sure to copy the whole line!__

It should look something like this

```bash
POSTGRES_PRISMA_URL="postgres://default:SomethingSomething@wow-many-words-such-fun.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
```

<figure class="mb-xl">
  <img src="/assets/images/articles/2024/umami/database secrets.webp" alt="Screenshot of Vercel's UI with the database secrets" title="Screenshot of Vercel's UI with the database secrets" />
  <figcaption>Your secrets to keep!</figcaption>
</figure>

### Creating the .env

Now, on GitHub we'll need to create two files for our project. One file is our environment variable file that tells Umami the password and URL for the database and the second file is a Vercel specific configuration file that allows you to serve the tracking script from your own site.



> [!WARNING] Important note!
> Before proceeding, make sure your repo is private!
> We're committing your secrets as a file and those can be misused.

So, in the GitHub repository page, hit the ___"+"___ icon and ___"Create new file"___.

<figure class="mb-xl">
  <img src="/assets/images/articles/2024/umami/github new file.webp" alt="Screenshot of GitHub's UI for creating a new file" title="Screenshot of GitHub's UI for creating a new file" />
  <figcaption>Adding a new file</figcaption>
</figure>

Give the file the name ___".env"___ and in the text editor, paste the "___POSTGRES_PRISMA_URL___" from earlier.

Let's edit the text a bit as well.

The original one looked like this:
```bash
POSTGRES_PRISMA_URL="postgres://default:SomethingSomething@wow-many-words-such-fun.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
```

and this is what we want it to look like:
```bash
DATABASE_URL=postgres://default:SomethingSomething@wow-many-words-such-fun.eu-central-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=10
```
1. rename the ___POSTGRES_PRISMA_URL___ to ___DATABASE_URL___
2. remove the quotation marks from the start and end of the url
3. remove ___?ssl=require___
4. change ___connect_timeout=___ from 15 to 10

All done! Now, ___commit the file___.



## TL;DR
1. Fork https://github.com/umami-software/umami
2. Create Postgres database in Vercel
3. Add .env file to fork with DATABASE_URL=yourpostgress-prisma-address like so
```bash
DATABASE_URL=postgres://default:SomethingSomething@wow-many-words-such-fun.eu-central-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=10
```
4. Add forked repo as a project on Vercel
5. Copy contents from https://analytics.umami.is/script.js to a new file on your website
6. Add script to your website like so

```html
<script defer src="/script.js" data-website-id="12345678-1234-5678-9012-345678901234" data-host-url="http://your-umami-install.vercel.app"></script>
```
___src___ is the script location on your website, ___data-website-id___ from your Umami install and and ___data-host-url___ is the url for your Umami install.


## Notes