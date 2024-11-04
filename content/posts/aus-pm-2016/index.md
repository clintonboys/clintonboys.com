---
layout: post
title: Australian federal election post-mortem
date: 2016-08-17T21:21:46-05:00
lastmod: 2016-08-17T21:21:46-05:00

categories:
  - Elections

feature_image: sample-image-17.jpg
feature_image_alt: Mt Ossa, Tasmania, 2014
---

# Australian federal election post-mortem

*August 17, 2016*

The below graph of the ALP and Coalition two-party preferred vote from the 2013 election until the eve of the 2016 election contains a massive amount of information and gives many insights about Australian politics and the electoral cycle. 

![TPP data](https://github.com/clintonboys/clintonboys.github.io/blob/master/_posts/tpp.png?raw=true)

I want to make a few comments about some features on this graph and then talk about the opinion polls in general and how they related to the actual result in a series of posts. 

## Honeymoon period

The "honeymoon period" of a new leader is a phrase that gets a lot of airtime in Australian politics, and this cycle provided an opportunity to witness the full honeymoon between Prime Minister Malcolm Turnbull and the Australian people, which began in September 2015 when he replaced Tony Abbott as leader of the parliamentary Liberal party, and ended in around April when opinion polls began to show the two parties' TPP support in a statistical tie, where it remained until election day. 

The interesting question is whether this is a feature of Australian politics in general, or whether this particularly dramatic course was peculiar to Turnbull. 

This century, there have been eleven changes of leadership in the two major parties. For each change in leadership, I looked the average of the five polls taken immediately before and immediately after the change and obtained the following list. The **Gov?** column indicates whether the party was in government (3 times) or not (8 times), and the **How** column indicates the way the old leader was removed: either deposed (6 times), resigned (3 times), or retired (2 times). 

| Year | Month     | Party | Old Leader       | New Leader       | Gov? | How      | Before | After | Change | 
|------|-----------|-------|------------------|------------------|------|----------|--------|-------|--------| 
| 2001 | November  | ALP   | Kim Beazley      | Simon Crean      | No   | Resigned | 49.5   | 48.3  | -1.2   | 
| 2003 | December  | ALP   | Simon Crean      | Mark Latham      | No   | Resigned | 50.1   | 50.5  | 0.4    | 
| 2005 | January   | ALP   | Mark Latham      | Kim Beazley      | No   | Resigned | 46.7   | 47.4  | 0.7    | 
| 2006 | December  | ALP   | Kim Beazley      | Kevin Rudd       | No   | Deposed  | 53.2   | 57.1  | 3.9    | 
| 2007 | November  | COA   | John Howard      | Brendan Nelson   | No   | Retired  | 45.7   | 40.5  | -5.2   | 
| 2008 | September | COA   | Brendan Nelson   | Malcolm Turnbull | No   | Deposed  | 42.8   | 44.6  | 1.8    | 
| 2009 | December  | COA   | Malcolm Turnbull | Tony Abbott      | No   | Deposed  | 43.4   | 44.2  | 0.8    | 
| 2010 | June      | ALP   | Kevin Rudd       | Julia Gillard    | Yes  | Deposed  | 50.7   | 53.5  | 2.8    | 
| 2013 | June      | ALP   | Julia Gillard    | Kevin Rudd       | Yes  | Deposed  | 46.3   | 50.6  | 4.3    | 
| 2013 | October   | ALP   | Kevin Rudd       | Bill Shorten     | No   | Retired  | 48.6   | 47    | -1.6   | 
| 2015 | September | COA   | Tony Abbott      | Malcolm Turnbull | Yes  | Deposed  | 45.8   | 51.4  | 5.6    | 

The data clearly supports the common notion of a "honeymoon effect", but only when the old leader is deposed (an average immediate lift in the polls of 3.2 percentage points). There are two deeper and more interesting questions here:

- how long do these "honeymoon periods" last for?
- is it worth changing leaders for the uptick in the polls?

In order to answer these questions we need to make some definitions. For the six changes of leadership resulting from deposals (3 ALP, 3 Coalition), let's define the "honeymoon period" to be the time between the change of leadership, and the first time the five-poll average dips below the average when the change of leadership took place. If this doesn't happen before the next leadership change, we'll define this as "infinite". 

| Deposal Date | New Leader | Honeymoon Period (1st def.)| 
|--------------|------------|----------------------------| 
| 04/12/2006   | Rudd       | 1230                       | 
| 16/09/2008   | Turnbull   | 60                         | 
| 01/12/2009   | Abbott     | 1860                       | 
| 24/06/2010   | Gillard    | 31                         | 
| 26/06/2013   | Rudd       | Infinite                   | 
| 14/09/2015   | Turnbull   | 410+                       | 

This table agrees with the media narrative from the tumultuous past decade of Australian politics: 

- Kevin Rudd was a highly effective Labor leader and the push to replace him with Gillard was a political mistake
- The shift to Malcolm Turnbull as opposition leader in 2008 was a disaster
- Tony Abbott was a highly effective opposition leader who struggled as Prime Minister

Notice we are unable to say anything yet about Malcolm Turnbull's stint as PM, nor was Rudd Prime Minister long enough for the second time in 2013 to say much from the data. 

There is another possible definition: the honeymoon is defined as over the first time the new leader is in a "losing position" (i.e. the five-poll average shows him or her getting below 50.0% in the TPP). We define the honeymoon period as 0 if the deposal was not enough to bring polling above zero. Using this definition we arrive at a slightly different table:

| Deposal Date | New Leader | Honeymoon Period (2nd def.)| 
|--------------|------------|----------------------------| 
| 04/12/2006   | Rudd       | Infinite                   | 
| 16/09/2008   | Turnbull   | 0                          | 
| 01/12/2009   | Abbott     | 0                          | 
| 24/06/2010   | Gillard    | 36                         | 
| 26/06/2013   | Rudd       | 11                         | 
| 14/09/2015   | Turnbull   | 300                        | 

The best approach is probably a combination. Define the honeymoon period to be 
- if the leadership change bumps polling to above 50%, until the next time the party is in a losing position
- if not, until the next time the party dips below the level of support when the deposal happened

Using this we can come up with an "effectiveness score" for each leadership deposal. You can think of this score as calculating the "area" under the polling curve inside the honeymoon bump and normalising. 

| Deposal Date | New Leader | Score| 
|--------------|------------|------| 
| 01/12/2009   | Abbott     | 3.2  | 
| 04/12/2006   | Rudd       | 2.1  | 
| 14/09/2015   | Turnbull   | 0.5  | 
| 16/09/2008   | Turnbull   | 0.1  | 
| 24/06/2010   | Gillard    | 0.1  | 
| 26/06/2013   | Rudd       | 0.0  | 

Interestingly, using the polling data only we arrive at the usual media narrative. 

## Third parties

Third parties in Australia have a very peculiar effect on the electoral process. Unlike in American elections, Australian third parties can have a significant effect on the electoral outcome, and can even win seats. This is mainly due to two factors

- compulsory voting, which increases the frequency of protest votes from electors who would otherwise not turnout, and
- [preferential voting]({{< ref "posts/aus-forecasting" >}}), which gives third parties' votes real electoral power in all contests. 

For this reason, polling Australian parliamentary elections is a priori more uncertain than in a traditional first-past-the-post contest, since third parties can introduce "chaotic" behaviour which is difficult to account for in polls.

For example, let's imagine a pollster is trying to understand how voters in the (imaginary, future) seat of Turnbull will vote on election day. 

They commission a poll of 550 voters with the following results

```
| Party | Votes | %  | 
|-------|-------|-----| 
| ALP   | 220   | 40  |
| LIB   | 130   | 24  | 
| GRN   | 100   | 18  | 
| ONP   |  50   |  9  |
| NXT   |  50   |  9  |
```

In a first-past-the-post race, as in the UK, this poll would conclude that the ALP is leading in the seat by 10 percentage points, with some margin of error that could be calculated easily, and would be fairly uncontroversial because the ALP lead is large and statistically significant. 

In Australia however, this "primary vote" data is largely meaningless in modelling the predicted winner of the seat, as one must first model how the votes of candidates who did not place in the top two will have their preferences distributed. Let us suppose that 100% of NXT and ONP voters place the Coalition at #2 and then consider the three following scenarios:

- **Scenario #1**. Green voters split 50/50 to the ALP and the Coalition. This results in a TPP vote of 51-49 in favour of the Coalition. 

- **Scenario #2**. Green voters split 55/45 to the ALP and the Coalition. This results in a 50-50 tied TPP vote. 

- **Scenario #3**. Green voters split 60/40 to the ALP and the Coalition. This results in a TPP vote of 51-49 in favour of the ALP.

This means that an understanding of the second preference votes of Green voters is *crucial* to the outcome in this contest, which is problematic since the sample size of the subsample of Green voters is much smaller, making the margin of error significantly higher. 

I think this concept is difficult to make statistically precise but in my opinion offers evidence that the margins of error quoted in Australian opinion polling are too low. 