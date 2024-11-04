---
title: Hugo migration
seo_title: hugo-migration
summary: Adventures upgrading my personal website with Hugo. 
description: This is the first full description of a constructed language I have created. It's a hobby I have dabbled in for over twenty years. 
slug: hugo-migration
author: Clinton Boys

draft: true
date: 2025-01-01T03:52:30-05:00
lastmod: 
expiryDate: 
publishDate: 

portfolio_image: mt_sol_thin.jpg
feature_image: mt_sol_thin.jpg
feature_image_alt: Mt. Solitary, Blue Mountains, Australia

project types: 
    - Technical

techstack:
    - Hugo
    - HTML/CSS
    - JavaScript
    - Vercel
---

# Migrating my personal site to Hugo

*January 1, 2025*

## Introduction

As foreshadowed in my [post]({{< ref "posts/ten-years" >}}) reflecting on ten years of running my personal website, I recently migrated the site to Hugo after more than ten years of blogging with Jekyll. 

There were quite a few reasons for the change:

- **Something new**. I enjoy constantly reshaping, rewriting and rebuilding things I have made. It means I am continuously polishing and improving this site, shaving off little things that shouldn't be there, going over all the copy again, and just generally spending time honing something - [sanding](https://blog.jim-nielsen.com/2024/sanding-ui/) it - which is a very calming and enjoyable pastime for me. 
- **Portfolio**. This was the big one. My old Jekyll theme (which was a *heavily* customised fork of [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) by Michael Rose) didn't have a built-in portfolio section, and I didn't really feel like sinking time into learning enough Jekyll to shoehorn one in myself. My new site has a shiny [portfolio]({{< ref "projects" >}}) section, with pride of place in the top navigation bar, showcasing a bunch of projects I have managed to finish or half finish in some form over the years. 
- **Dark mode**. It seems like you can't have a techy personal website these days without a fancy switch that toggles between light and dark mode, defaulting to the setting of the user's browser. Hugo-liftoff came with this built in, so all I had to do was tweak the exact theme colours to my liking. I ended up using the same background colour for dark mode that I have used for five years over at [Mt Solitary](https://www.mtsolitary.com/). 
- **Hugo**. I'm sure there's lots of arguments in the Hugo versus Jekyll debate. I chose Jekyll ten years ago, but Hugo feels a lot more modern, is significantly faster, and doesn't have the Ruby dependency, which always gave me trouble. I also have used Hugo to successfully build [other]({{< ref "projects/nitzanboys-com" >}}) [websites]({{< ref "projects/mt-solitary" >}}) in the last few years so I've built up a bit of experience and comfort with it. 
- **Reading time indication**. Another nice little feature of the theme I built around was a built-in reading time indication for [posts]({{< ref "posts" >}}). Of course this would have been easy to add myself, but it was nice that it came out of the box. 
- **Vercel**. I had already done this in my ten-year revamp of the Jekyll site, but deployment is now done through Vercel instead of Github Pages, removing my dependency on Github (and of course adding a new dependency on Vercel, but it feels like an easier one to move away from in the future). 

Here's a picture of the two sites side-by-side. On the left, the new Hugo site, on the right, the old Jekyll site (now archived [here](https://clintonboys-github-io.vercel.app)). 

![Side by side comparison](side-by-side.png)

I did the migration very manually, copying pages over one by one and fixing up things that needed to be fixed. For each page, the things I had to change were

- front matter
- mathematics typesetting
- internal links

The things I had to tweak globally were

- theme colours
- web fonts
- mathematics typesetting
- Goatcounter support
- completely rejigged the navigation bar
- changed the "feature image" to be more like I had on my old site, including an image caption


