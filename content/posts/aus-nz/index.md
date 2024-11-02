---
layout: post
title: The 2016 Australian election - New Zealand rules
date: 2017-10-08T21:21:46-05:00
lastmod: 2017-10-08T21:21:46-05:00

categories:
  - Elections

feature_image: sample-image-46.jpg
feature_image_alt: Rob Roy Glacier National Park, New Zealand, 2014
---

# The 2016 Australian election - New Zealand rules

*October 8, 2017*

New Zealand has a significantly different electoral system to Australia, and just had an interesting election with a fairly unexpected result. I thought it might be interesting to see how the most recent Australian election might have played out if it had taken place under "New Zealand rules".

## The New Zealand electoral system

In Australia, the country is split into six states and two territories, and each state or territory contains a number of *electorates*, which are geographical areas with relatively equal populations who each elect one of 150 members to the lower house of parliament.

In New Zealand, the system (called MMP - Mixed Member Proportional) is more complicated.

First of all, the country (which has no states) is split into population-based electorates *twice*: once for the general population (giving 64 electorates), and a different split for Maori citizens who choose to enrol on a different electoral roll (giving an additional 7 electorates, called Maori electorates). Candidates are chosen in a simple first-past-the-post contest (no preferences, making this step much simpler than in Australia). 

On top of the electorates, each voter actually casts *two* ballots: one for his electorate, and another "party-list" ballot for his favoured party. An additional 49 seats are allocated proportionally to parties according to the party-list votes they receive. 

This gives a total of 120 seats. After an election, the process of forming a government proceeds the same as in Australia, although due to the lack of preferential voting and the party-list system, hung parliaments are a much more common occurrence. 

## Reshaping the Australian electoral map

If we want to simulate the 2016 Australian election under New Zealand rules, there are a few major changes we need. First, on top of the 150 geographical electorates, we need to create additional electorates for Aboriginal voters. Second, we need to create party-list seats and populate them proportionally. And finally, we need to re-run all the 150 geographical contests using first-past-the-post.

### Aboriginal electorates

This is the concept which translates least successfully to Australia. In New Zealand, the Maori form a much more significant proportion of the population (around 18% of New Zealanders claim Maori heritage) and from the country's conception have played an important political role. Around half of the Maori population of New Zealand choose to enrol on a separate Maori roll, which allows them to elect 7 members to special Maori seats. This is a fairly controversial system whose history is very interesting but which I won't go into here.

Recasting it in Australia requires some thought. In Australia, only around 3% of the population identify as Aboriginal or Torres Strait Islander. So if we assume the same percentage as in New Zealand would enrol to vote in Aboriginal electorates, there should only be around 2 or 3 of these electorates. I'll assume there are three, and based on voting patterns in electorates with high proportions of Aboriginal voters, I will assume that these three "Aboriginal electorates" go to the ALP (interestingly this is also the case in New Zealand, where the Labour party wins most Maori electorates, with seats occasionally going to the Maori party). 

### Party-list seats

To keep the proportions the same as in New Zealand, we need to introduce 107 party-list seats into the Australian house of representatives (meaning the total number of seats including the 150 geographical seats and the 3 Aboriginal seats is 260). These seats are easy to distribute; we simply look at the national primary vote from 2016 and distribute seats proportionally:

- Liberals: 40
- Labor: 37
- Greens: 11
- Nationals: 5
- Independents: 3
- Nick Xenophon Team: 2
- Family First: 2
- Christian Democrats: 1
- One Nation: 1
- Animal Justice Party: 1
- Katter's Australian Party: 1
- Rise Up Australia: 1
- Liberal Democrats: 1
- Another minor party: 1

### Geographical electorates by first-past-the-post

In 2016, the results for the 150 electorates after full distribution of preferences was:

- Labor: 69
- Liberals: 66
- Nationals: 10
- Greens: 1
- Nick Xenophon Team: 1
- Katter's Australian Party: 1
- Independents: 2

Under the first-past-the-post, the map would look much different (data from the [ABC](http://www.abc.net.au/news/2016-11-07/us-election-voting-explained-using-australian-results/7975062)):

- Liberals: 74
- Labor: 54
- National: 17
- Greens: 2
- Katter's Australian Party: 1
- Independents: 2

### Putting it all together

When we combine all these together, we get the following seat distribution in the 260-seat Australian parliament (so a party or coalition of parties needs 131 seats for a majority). 

- Liberals: 40+74 = 114
- Labor: 3+37+54 = 94
- Nationals: 5+17 = 22
- Greens: 11+2 = 13
- Independents: 3+2 = 5
- Nick Xenophon Team: 2
- Katter's Australian Party: 1+1 = 2
- Family First: 2
- Christian Democrats: 1
- One Nation: 1
- Animal Justice Party: 1
- Rise Up Australia: 1
- Liberal Democrats: 1
- Another minor party: 1

The Liberal-National coalition has 136 seats which gives them a 6-member majority without having to rely on the votes of minor far-right parties.

## Conclusions

It's interesting to note two things:

- The ABC ran a similar analysis simulating the 2016 election under US rules and also found it much easier for the Coalition to run
- Of course, as Antony Green notes, elections and their results are tightly related to the electoral system they are held under, and the results would be different if held under MMP. 
