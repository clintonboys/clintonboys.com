---
title: Mt. Solitary
seo_title: mt-solitary
summary: My "digital garden" for notes, references and thoughts.
slug: mt-solitary
author: Clinton Boys

draft: false
date: 2021-01-10T03:52:30-05:00
lastmod: 
expiryDate: 
publishDate: 

portfolio_image: mt_sol_thin.jpg
feature_image: mt_sol_thin.jpg
feature_image_alt: Mt. Solitary (Korowal), Blue Mountains, NSW, Australia

project types: 
    - Technical

techstack:
    - HTML
    - CSS
    - Hugo
    - Vercel
---

# Mt. Solitary

*January 10, 2021*

Mt. Solitary is my name for my "digital garden": a place to nurture my mind, my thoughts, and myself. It is tended to constantly, but slowly, and develops and changes consistently over the years. There is a community of folks all over the "indie web" who are creating sites like this just for the fun of it. This note explains how Mt. Solitary was built, in case someone would like to base their own site off how I've cobbled it together.

## Writing

I write my notes, like everything else, in [emacs]({{< ref "posts/emacs-i" >}}). All the notes that comprise Mt. Solitary are written as org-mode files using org-roam, an open source Roam Research clone written for emacs. I use this for all my notes, including personal notes and my daily journal, and tag notes that I specifically want to be published on the site with the tag `public`.

If you don't know anything about emacs then most of this will be very hard to follow. If you're interested in learning a very interesting and unique text editor that you can tailor _exactly_ to your needs and use to automate a whole bunch of workflows (assuming you are comfortable with some sort of scripting language, or better, Lisp, then I think it's a fun and interesting way to set things up. If you aren't into that sort of thing, there are plenty of other ways to manage text files, and you can always write everything in Markdown and skip straight to the "publishing" section below). 


## Resources

-   To get started with emacs, you should probably watch David Wilson's [emacs from scratch](https://www.youtube.com/watch?v=74zOY-vgkyw&list=PLEoMzSkcN8oPH1au7H6B7bBJ4ZO7BXjSZ) video series on YouTube. He also covers the basics of org mode.
-   You can get the idea of org roam by watching any Roam Research propaganda on YouTube.
-   [Here](https://blog.jethro.dev/posts/introducing%5Forg%5Froam/) is the original blog post introducing org roam.
-   You can find more about roam tags in the fairly extensive org roam [docs](https://www.orgroam.com/manual.html).

## Organising

The idea behind a Zettelkasten-style system is that notes are not organised according to any sort of hierarchy, but rather according to their relationships to each other. So all notes are stored in a single directory, and a sort of "graph" or "network" is built between notes by a two-step process.

-   Making sure to insert links to important concepts or repeating ideas when you are writing notes, and that if they have not been referred to before, create a new "stub" note for that idea.
-   Each of these ideas contains a list of "backlinks": notes which link to it. The note itself can now be elaborated on, and can take inspiration from the list of concepts which link to it.

With time and a "critical mass" of notes, this method really does begin to reveal new and interesting connections between ideas.

## Publishing

Publishing my notes essentially means converting them from org mode markup into Markdown files to be served with Hugo. This is a fairly involved process as the syntax for the two markup languages is quite different, particularly how links work, and Hugo needs quite a lot of boilerplate on its Markdown files which correspond to tags and so forth.

Taking inspiration from [Jethro Kuan](https://github.com/jethrokuan/braindump/blob/master/build.py), who created the org roam package, I wrote a series of Lisp and Python scripts which

-   look for all org files in my `~/roam` directory which are tagged as public
-   create a [Ninja](https://ninja-build.org) build command to convert each one into Markdown files (the build command runs `emacs -l` with a custom [init](https://github.com/clintonboys/emacs.d/blob/master/init%5Ffor%5Fpub.el) file that only contains the specific packages I need to load to run the conversion [script](https://github.com/clintonboys/emacs.d/blob/master/publish.el))

Ninja, which is a great little build tool, then knows how to only build the files which have been updated since last time it was run.

You can see all the code I use to publish the site in my [emacs.d](https://github.com/clintonboys/emacs.d) configuration files on Github.

**Update (2023-04-06)**

I had some very annoying troubles with my publish scripts, caused by a half-baked attempt to try using logseq as a mobile interface to my org-roam files with proper backlinking support and org syntax. It was a very promising idea but ultimately the app is just not good enough, the editor is slow and clunky and it does not handle my large knowledge graph well.

In the process of changing the location of all my org files to iCloud Drive so that logseq could read them (it doesn't work with Dropbox), I really messed up my org-roam database and it took me a good couple of months to figure out all the commands I had to run to get everything clean and working again (though the reason it took so long is probably because I was spending a lot of my time dealing with two small children).

A persistent issue was that the export would work without errors, but each link would actually be to the file itself instead of the linked file. This is due to some unintelligent defaulting behaviour in the publish script that I should try to find a time to patch and upload to GitHub. In any case, if something like this should happen to you, make sure that

1.  You only have a single copy of your org files in the directory, since logseq can sometimes make copies in weirdly-named subdirectories.

2.  `org-roam-db-clear-all` and `org-roam-db-sync` are your friends, but if you do a major delete of duplicate files you should always run `org-roam-update-org-id-locations` first.


## Serving

The final step is to serve the Markdown files using Hugo. Installing Hugo and getting a simple site running is very straightforward and there are plenty of tutorials on the web. I downloaded the [hugo-book](https://themes.gohugo.io/hugo-book/) theme and made my own [fork](https://github.com/clintonboys/hugo-book) with a few changes, specifically:

-   I added support for Google Fonts.
-   I removed the list of articles on the side bar and kept the search bar.
-   I changed the background colour and the font colour (my own dark mode).
-   I added MathJax support.
-   I added Goatcounter support so I can have basic analytics on the site without invading people's privacy.
-   I added backlinks as part of the HTML templating (this way backlinks are already up-to-date and don't need to be generated as part of the export, as it's a little complicated to know which pages have had their backlinks updated, since it's not stored in the org file but rather in a SQLite database that org roam uses). A couple of times I have had issues with backlinks not being generated properly; it's usually enough to just destroy and recreate the link the org file and things sort themselves out.
-   I added four pages which are dynamically generated using Hugo [templating](https://gohugo.io/templates/introduction/):
    -   the index, an alphabetical list with links to all posts, with their word counts and last updated date
    -   the recent updates page, a list of links to the twenty most recently updated posts on the site
    -   the stubs page, a list of links to pages with no content (without considering backlinks), which can serve as ideas for notes to flesh out in the garden
    -   the summary, which contains a few dynamically updating statistics about the site.

I then use Vercel and their fantastic free "hobby" plan to serve the site, which was so simple to do with Hugo and Github that I was able to do it in about five minutes. The very final step is adding a custom domain, which is just a matter of setting up the DNS configuration properly with your domain provider according to the instructions on Vercel.

I think it would be a nice idea to turn this fork into a "digital garden" theme for Hugo, and include some scripts to easily publish your org roam files to it.


## Links and resources {#links-and-resources}

-   Org roam [discourse](https://org-roam.discourse.group/t/package-dedicated-to-workflows-publishing-digital-garden-on-web/536) thread discussing various solutions for publishing to a digital garden from org roam.

