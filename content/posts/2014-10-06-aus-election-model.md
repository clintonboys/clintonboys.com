---
layout: post
title: Difficulties in forecasting elections in Australia
image:
  feature: sample-image-8.jpg
  credit: Blue Mountains, New South Wales, 2014
---

In this post I will outline several of the difficulties involved in creating a model for forecasting Australian parliamentary elections. 

### Introduction

In recent years, statistical approaches to electoral forecasting have become particularly popular. The most famous example in the past decade has been the rise of Nate Silver and his FiveThirtyEight model, which has been immensely successful in predicting outcomes of American elections, as well as bringing the notion of precise and robust electoral forecasting to the forefront of public discourse.

In such an environment it is natural to ask why there has been no equally sophisticated and successful attempt to replicate Silver's approach outside of the United States. The answer is that, by and large, the United States as a country, and its political system, are particularly well-suited for the type of analysis provided by Silver. 

On the other hand, the Australian electoral system, and its child systems in various Australian states, together with Australia's geographic and demographic make up, make it particularly poorly suited for the robust regression analysis of opinion polls propounded by Silver. In this post I want to discuss the main reasons for these difficulties, and present some comments and suggestions towards a solution. The hope is that I can recast the discussion towards formulating a different model, specifically designed for the Australian system, that is able to provide a similarly accurate and robust analysis of Australian elections (this has always been an ongoing long-term project of mine!). Such a model would ostensibly be adaptable to elections in the UK, with some changes (the UK also presents some other unique challenges). 

In order to begin discussing any kind of analysis of polls for Australian elections, it is necessary to concede that sample sizes and poll frequencies here are nowhere near those achieved in the United States. This will have an unavoidable and significant effect on accuracy of results and sizes of confidence intervals that **cannot be compensated for**, without actually physically conducting more polls. 

There is an understandable desire for electoral forecasting to be accurate. Nate Silver has done his own craft a disservice in a sense: his two phenomenally accurate predictions of US presidential elections were still to some extent the result of luck: there is always inaccuracy when attempting to predict a complicated process with limited data, and this is something that needs to be accepted will be a greater trade-off in the Australian case (I'm still dreading the time that one of Silver's forecasts is wrong and people write off the statistical method forever, even though he's bound to be wrong 1/20th of the time). Nevertheless, I am confident that a fair level of accuracy can be obtained with a careful approach that uses all possible data: 

- an average of opinion polls, weighted for pollster past accuracy
- demographic data at a seat level
- past election data
- redistribution data
- preference data
- an economic index

to obtain probabilistic forecasts for each seat (this is my ultimate goal). 

### Constituency sizes

It is worthwhile noting that FiveThirtyEight does **not** attempt to forecast US congressional elections on a district-by-district basis (instead providing a probabilistic model for the Congressional makeup as a whole). This however is the sort of analysis one would expect in Australian elections to provide an analog to Silver's presidential forecasts. Except on an occasional, one-off basis, individual seats are **never** polled in Australia, so seat-by-seat data is non-existent (and when it is available, is too sporadic to be worthwhile).

The most robust and accurate opinion polling is conducted on a **countrywide** basis; often these countrywide results are broken down into states, but never into electoral districts. There should be a way to use clustering and nearest-neighbour analysis to obtain extrapolated polling estimates for individual districts. Indeed, FiveThirtyEight.com does a similar thing, using polls in "similar" states (where clustering is used to obtain a measure of similarity) as proxies for polls. For example, if a poll is released in New Mexico, and New Mexico has quite similar demographic features to Arkansas, the New Mexican poll probably has some bearing on trends in Arkansas. 

In Australia, my idea is to turn each national poll into one hundred and fifty simulated seat polls, based on trends and demographic data, and then to perform the usual aggregation and regression on these polls. 

### Preferential voting

A successful forecasting model for elections in Australia needs to take into account its unique preferential voting system. In federal elections, voters are required to number all candidates in order of preference: only numbering a first preference results in an informal vote (in various states, preferential voting is optional, and there is a significant movement, particularly among prominent psephologists, to move to optional preferential voting on a federal level).

The deciding metric in the election of an Australian Member of Parliament is his/her two-party preferred vote, which is obtained through a complicated process of simulating multiple elections using preferences from voters, discarding the least popular option at each run-off until only two candidates remain and it becomes a simple first-past-the-post race. Data on preferences is very difficult to obtain precisely, since it changes from year-to-year quite significantly, usually based on "how-to-vote cards", which are materials handed out by party volunteers at polling places suggesting preference orderings.

This is a difficult problem without an optimal solution. The best solution would be to obtain historical preference profiles for individual seats and use these to simulate each election as a series of run-off elections like the AEC does, performing this a number of times to obtain some sort of probabilistic estimate.

### Redistributions

As a fantastic bulwark against gerrymandering, and in a democratic statement that should be the envy of democracies worldwide, electoral districts in Australia are not fixed, but have boundaries which change according to shifting demographics as measured by census data. This makes precise comparisons between historical elections extremely difficult on a seat-by-seat basis, as many seats cease to exist between elections, or have become so distorted from their original boundaries that there is no meaning in comparing them.

If possible, I would like to obtain historical election data for, and extrapolate polling data to, polling places rather than just electoral districts. Since it is always entire polling places that are reassigned to new or different districts, this will allow a more accurate calculation of the model on redistributed seats (Antony Green regularly performs the explicit calculation of "redoing" elections on new boundaries: a model would need to be built, preferably using demographic data from the census, to project opinion polling data onto polling places).

It should be clear that this would be an extremely lengthy and time-consuming process not without significant complications:

- there are [nearly 8,000](http://www.aec.gov.au/about_aec/cea-notices/election-pp.htm) polling places in the country for federal elections
- census data can be obtained grouped by federal district (and in some states, by state district), but **not** by polling place
- I'm not sure if state electoral commissions publish results by polling place 

It seems to me that, given the infeasibility of performing the above task, a better idea would be to perform some sort of correction for redistributions similar to what Antony Green does when calculating "nominal swings" (his figures get used by all media outlets all over the country). 

### Existing models

There are plenty of existing models on the web for forecasting elections, or at the very least analysing and aggregating polls. As far as I'm aware, none provide the full model that I am proposing.

- [Kevin Bonham](http://kevinbonham.blogspot.com.au). This is the best model in my opinion, combining a fairly simple model with interesting and thoughtful analysis of elections and polls. He was also nice enough to send me some of his data. 
- [The Poll Bludger](http://blogs.crikey.com.au/pollbludger/) (Crikey). Does a fairly simple poll aggregator. Otherwise lots of good analysis of elections and Australian politics. 
- [The Phantom Trend](http://www.phantomtrend.com/). A sophisticated aggregator with some accuracy weightings. Has the humility to refer to themselves as "Like Nate Silver, only less accurate."

### Economic index

Finally, I'll explain why it's difficult to economic index to include in our model. In the FiveThirtyEight model, the underlying idea is that a strong economy tends to help the incumbent party. I haven't done a huge amount of research but I would assume this assumption is weaker in Australian parliamentary elections than in American presidential elections. 

The FiveThirtyEight model uses only a few variables to come up with an economic index:

- nonfarm payrolls (this variable measures unemployment)
- personal income
- industrial production
- personal consumption expenditure
- inflation
- forecasted GDP
- stock market

The problem with trying to use this data (or similar data) in Australia is that very few economic variables are published monthly or more frequently by the ABS. This makes using the economic index to guide a forecast built with poll data problematic, as the economic index is operating on a different timescale. I spent a bit of time trying to come up with analogous variables to these to use, but there just aren't enough variables released on small timescales to make what I would think is a reasonable index. 

For this reason, at least at first, I'm not going to include an economic index in my model, until I can find a way to make a more meaningful one, and until I have done more research to test which particular economic variables are correlated strongly with election results. This again highlights the significant difficulties in aping the FiveThirtyEight model, and is another reason why I'm planning on coming up with a different idea. 
