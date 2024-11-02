---
layout: post
title: Marginal seat polls and the strong transition model
date: 2015-05-21T21:21:46-05:00
lastmod: 2015-05-21T21:21:46-05:00

categories:
  - Elections

feature_image: sample-image-2.jpg
feature_image_alt: Cradle Mountain National Park, Tasmania, 2014
---

# Marginal seat polls and the strong transition model

*May 21, 2015*

As I've recently (and finally) become gainfully employed, I haven't been able to devote a huge amount of time to my [model]({{ site.baseurl }}{% link _posts/2015-05-14-aus-election-model-9.md %}) for forecasting Australian elections. I have spent some time rewriting my sloppy code, fixing some redundancies and bugs, and improving the model to include the first few things on my to-do list. 

The major theoretical improvement I've been thinking about over the last month is the [strong transition model](http://www.electoralcalculus.co.uk/strongmodel.html) which I learnt about while reading about the May 2015 UK general election (I was planning to write a post about why the polls failed so miserably to predict the result but I read so many good summaries of this I don't really think it's necessary). 

This model of voter behaviour at multi-party elections caught my eye after my initial model performed poorly in seats where the PUP candidate had a particularly strong showing. The thinking behind the model is that political parties generally have a two-tiered system of support: their dyed-in-the-wool followers who will vote for the party no matter what, and other supporters, who are more flakey and prone to switching teams. The proportion of a party's supporters in the former group is an unknown, and difficult to estimate, parameter of the model: the May2015 website put it at 20%. When a party loses support in the polls, it loses it from the *non-strong* group first. The [page](http://www.electoralcalculus.co.uk/strongmodel.html) at Electoral Calculus explains the idea with the help of some graphs. So this is being incorporated into the model at the moment. 

The second thing is the use of marginal seat polls to improve the model. It has always been my intention to include demographic data in the model, and using marginal seat polls allows me to do this in the following way. 

Suppose we cluster seats according to demographic data, like I did [here]({{ site.baseurl }}{% link _posts/2015-02-13-aus-election-model-8.md %}). And suppose we have some national (or state-level) swing that we want to adjust to a local level. I think the right way to combine these two pieces is using marginal seat polls: they give the link between the clusters and the swing adjustments. That is, if we have a marginal seat poll for one seat in a cluster, we can adjust the whole cluster away from the national swing by the amount the marginal seat within deviates. This is essentially the same thing that the FiveThirtyEight model does for states which are not polled frequently.

The main theoretical issue with this idea is the margin of error associated with the marginal polls, as well as their frequency and comparability across elections. I'm working on scraping marginal poll data and my next post will be an analysis of how it can fit into my model. 