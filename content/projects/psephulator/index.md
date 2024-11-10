---
title: Psephulator
seo_title: psephulator
summary: A command line tool for simulating and analysing election data.
description: This is the first full description of a constructed language I have created. It's a hobby I have dabbled in for over twenty years. 
slug: psephulator
author: Clinton Boys

draft: false
date: 2024-02-10T03:52:30-05:00
lastmod: 
expiryDate: 
publishDate: 

portfolio_image: pseph.png
feature_image: IMG_2785.jpeg
feature_image_alt: Rottingdean, England, 2024

project types: 
    - Elections

techstack:
    - Rust
    - Data
    - CLI
    - Work in progress
---

# Psephulator

*February 2, 2024*

Over the years I have done a few thought experiments on this site which could all be categorised as "taking the results from a real-world election and simulating them under a different electoral system": 

- The 2019 United Kingdom election simulated under an ["AV" preferential voting system]({{< ref "projects/uk-av" >}})
- Fifty years of Australian federal elections simulated under party-list [proportional representation]({{< ref "projects/aus-pr" >}})
- The 2016 Australian federal election under a New Zealand-style [mixed system]({{< ref "posts/aus-nz" >}})

I think these projects are very interesting in demonstrating how subtle changes to electoral systems can have a significant impact on the results of the election, and more generally supports a long-standing hypothesis of mine: that the political landscape in any particular country (or state, region, whatever) is dramatically influenced by the electoral system there. 

I wanted to build a tool that allows anyone to run these sorts of experiments, and more generally, to play with hypothetical scenarios based on real-world election data and electoral systems. 

## The idea for Psephulator

Psephulator[^1] is an open-source command-line tool for simulating elections. It's written in Rust, and you can find the code on GitHub [here](https://github.com/clintonboys/psephulator). It's currently in a very basic state - essentially I have just written the code for the "proof of concept" example below. I plan to add more and more functionality as I find time to work on the project. If anyone else would like to contribute, please contact me, or just open a pull request!

## Key components of Psephulator

My idea for Psephulator consists of three key components. 

**Election results database**

The tool will be most powerful and interesting if it has a full database of election results from around the world. Such a database already [exists](http://www.globalelectionsdatabase.com), and a key early step in the development of Psephulator will be to write an interface to this database. It's important that the tool only knows how to read the "raw" results of elections, in as low resolution as possible (for example, by booth (Australia) or polling place (UK) or county (US)). 

**Electoral system engine**

Once the tool can load the *raw* results from any election, it will need to support the ability to recreate the full results based on the specific electoral system of the country. For example, in the UK this involves aggregating the results into constituencies and determining the winner of each constituency by the simple [first-past-the-post](https://en.wikipedia.org/wiki/First-past-the-post_voting) system. I have currently coded up first-past-the-post and (a simplified version of) optional preferential voting into the tool, and the idea is to write an "engine" for every electoral system in the world, as well as theoretical and experimental ones. 

**Simulation engine**

The simulation engine decouples the first two components, allowing you to re-run the results of any election under any electoral system you choose. You can even construct a new "simulated" election result, and then see how that result would be interpreted under different systems. 

## Example - 2024 UK Election under AV

As an example of where I would like to take Psephulator, I have written enough of the code to be able to reproduce my [experiment]({{< ref "projects/uk-av" >}}) from the 2019 UK election on this year's election. First, we start the tool by typing `psephulator` into the console. We're greeted at the moment with a single option because I've only loaded one election result into the tool, but in the future you can imagine a sophisticated search system allowing you to choose election results from any country (or even national subdivision like US state) from any year. 

![alt](scrnsht1.png)

Once we have the results, we choose the electoral system we'd like to simulate the results with. If you choose "First Past the Post" the tool manages to recreate the [results](https://commonslibrary.parliament.uk/research-briefings/cbp-10009/) correctly. But we can also choose a different system - say "Alternative Vote". 

![alt](scrnsht2.png)

Alternative Vote is a fairly different system from the one that the actual election was conducted under - you can see a longer discussion of why [here]({{< ref "projects/uk-av" >}}) - so to successfully simulate it we need to provide some estimated parameters, in this case: the estimated preference flows for all the parties. In a full version of the tool, the "simulation engine" would provide the ability to run "grid searches" over this parameter, like I did in my 2019 experiment. 

For now, I just have a single hard-coded `preference_flows.json` file (and only for England), and if we choose that the tool will simulate the AV election with these assumed preferences. 

![alt](scrnsht3.png)

And there is the result: 258 seats for the Conservatives and 344 for Labour with these preference flows, which were my best quick guess at something reasonable: most Brexit party preferences flow to the Tories, and Liberal Democrat preferences are about 50/50. This is a much different result from the actual one, in which Labour won 411 seats and the Conservatives 121. 

## Footnotes

[^1]: The name is inspired by the word [psephology](https://en.wiktionary.org/wiki/psephology), which is the analytical or statistical study of elections and electoral systems. 

