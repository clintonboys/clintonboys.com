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

Psephulator[^1] is an open-source command-line tool for simulating elections. 

## Key components of Psephulator

### Election results database

### Electoral system engine

### Simulation engine

## Example - 2024 UK Election under AV

![alt](scrnsht1.png)
![alt](scrnsht2.png)
![alt](scrnsht3.png)

## Footnotes

[^1]: The name is inspired by the word [psephology](https://en.wiktionary.org/wiki/psephology), which is the analytical or statistical study of elections and electoral systems. 

