---
layout: post
title: Multilevel regression with poststratification (MRP)
date: 2020-10-05T21:21:46-05:00
lastmod: 2020-10-05T21:21:46-05:00

categories:
  - Elections
  - Statistics

feature_image: sample-image-74.jpg
feature_image_alt: Koh Samui, Thailand, 2019
---

# Multilevel regression with poststratification (MRP)

*October 5, 2020*

Following on from a [post]({{< ref "posts/heirarchical" >}}) earlier in the year about multilevel models, I thought I'd follow that post up with a discussion about how multilevel models are commonly used these days in modelling elections. 

Multilevel regression *with poststratification*, commonly known as MRP, is a statistical technique commonly used by polling agencies as well as in cutting-edge election forecasting models. It involves using demographic data from highly accurate polls (usually censuses) that can be assumed to be true measures of the target population, and using these to reweight, for example, national level polls to a state or constituency level. 

## Multilevel regression

Elections are indeed a very natural use case for the multilevel regression idea, even before trying poststratification. In the previous post I looked at a response variable describing the cost of a certain medical treatment, looking at the patient's age but also at the doctor who treated them as a categorical variable. In the example of elections, national polls may be conducted and key demographic variables may be recorded alongside voting intention data. This can lead to insights like "80% of Black American voters plan to vote for Biden but only 45% of white American voters". 

## Poststratification

This is the process of using census data to "stratify" the national polls down to a state, or constituency level. For example you may know a certain American state's population is 40% Black and 30% white, and use this (and potentially other features) to infer the state's Biden / Trump margin overall. 

## Examples and resources
- This is a really detailed description of the [model](https://www.survation.com/2019-general-election-mrp-predictions-survation-and-dr-chris-hanretty/) British market research firm Survation used to very accurately predict the results of the 2019 UK parliamentary elections. 
- Very good [survey](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/04/forecasting-with-nonrepresentative-polls.pdf]) paper with a running example of a US Presidential election. 
- An [example](https://www.tellingstorieswithdata.com/multilevel-modelling-with-post-stratification.html) using Australian national polls, census data and poststratification to build state-level estimates. 
