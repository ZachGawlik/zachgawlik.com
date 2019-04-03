---
title: How I Sidestepped DigitalOcean RAM Constraints
date: '2017-07-11'
---

When it came time to put my pet project [Print To Resist][print-to-resist-repo] online, I faced a set of unfamiliar problems. It was my first full stack project that I was deploying by myself and my first time working with DigitalOcean. While their setup guides were helpful, I was at a loss when I got this error when I tried to run `npm install` to build my React front end on the server.

```
Killed - fetchMetadata: sill mapToRegistry uri http://registry.npmjs.org/...
```

The few relevant search results for “killed digitalocean npm install” all point to [a guide on adding swap space][do-swap-article], which explains how to designate disk space as emergency working memory. But the large red warning on the page explaining the negative impacts on the underlying hardware made me search for an alternative.

Why was I trying to install my front end’s dependencies on the server anyway? And if my droplet ran out of memory on install, wouldn't it also likely run out when trying to create my production webpack build? I wanted to keep my production code directly tied to the code in the repository, but I also didn't want to clutter it by directly including the `build` directory. That's when I got the idea to hide the built code on a separate branch, and I found a simple tool designed for exactly that.

## Setup

The [gh-pages][gh-pages-repo] CLI tool makes it easy to publish a section of your code to a separate branch. In this case I wanted to create a branch for my bundled front end. To do so, I added the following script to my `package.json`:

```json
{ "deploy": "gh-pages --dist build --branch build" }
```

This lets me keep my master branch free of the build folder by instead hosting the code on a separate branch. On the server, I can retrieve only this bundled code by cloning the single branch: `git clone -b build --single-branch <<repo-url>>`

## In action

Once setup, if I want to deploy my front end changes, I can rebuild the project and run `npm run deploy`. With the new bundle now on the public build branch, I simply have to run `git pull` on the server to retrieve the latest version.

While this is certainly a far cry from continuous deployment or automated build pipelines, I found this to be a great simple method for my solo personal project. Using `gh-pages`, I successfully avoided DigitalOcean RAM constraints without having to upgrade my droplet or using the discouraged swap space approach.

[print-to-resist-repo]: https://github.com/ZachGawlik/print-to-resist
[do-swap-article]: https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-16-04
[gh-pages-repo]: https://github.com/tschaub/gh-pages
