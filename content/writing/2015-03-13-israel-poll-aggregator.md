---
title: Aggregating Israeli opinion polls
seo_title: Aggregating Israeli opinion polls
slug: israeli-poll-aggregator
author: Clinton Boys

draft: false
date: 2015-03-13T21:21:46-05:00
lastmod: 2015-03-13T21:21:46-05:00

feature_image: sample-image-9.jpg
feature_image_alt: Blah

categories:
  - Elections

toc: false
related: true
social_share: false
newsletter: false
disable_comments: false
---

The Israeli electoral system is completely different to the Australian system. 120 representatives are elected to the Knesset from a single at-large electorate. Members must be registered to a party; parties submit lists of candidates in an order they want them to be elected, candidates are then elected to the Knesset from these lists based on a proportion of votes received by each party, provided the vote is greater than the electoral threshold (currently 3.25%, a significant increase from the previous election). 

It is difficult to provide a probabilistic model of what the Israeli government will look like after the election, even with the significant amount of polling that exists, because Israel's proportional representation system has meant, like many European countries in the post-war period, majority governments never occur. Rather, the election is just the first phase of a process that is followed by political wrangling and deals behind closed doors to form a coalition government (and these are often very unstable: the current election is more than twelve months early because of the breakdown of a previous coalition). 

In these two posts I just want to come up with a simple poll aggregator that adjusts for accuracy in previous contests. There's a whole bunch of opinion polls floating around but most aggregators (like the one on HaAretz) just seem to take a simple average (although I imagine there's plenty of sites in Hebrew that I can't read yet). For this first step, I want to look at the final poll all the polling firms did before the 2013, 2009 and 2006  elections and come up with an accuracy score for each polling firm which will then translate into a weight in the aggregator. 

I looked at the Wikipedia pages for each election, which contain a lot of opinion polling information, and put together lists of final polls before the respective elections (historical_polls) for lots of different polling firms. I also needed the results of each election (results). 

    import pandas as pd
    from pandas import DataFrame

    historical_polls = pd.read_csv('israeli_pre_election_polls.csv',delimiter=',')
    results = pd.read_csv('israeli_results.csv',delimiter=',')
    results = results.set_index('year')
    historical_polls = historical_polls.sort('pollster')

The following code produces a fairly simple weighting mechanism, where a pollster with average error receives a weight of 1; below-average pollsters receive less and above-average more. 

    parties = ['Kadima', 'Likud', 'Yis Bet', 'Labor', 'Shas', 'UTJ', 'Hadash', 'Balad', 'Meretz', 'Yesh', 'Otzma', 'Am', 'Hatnuah', 'NU', 'Greens', 'Gil']

    final_frame = pd.DataFrame(columns = historical_polls['pollster'].unique(),index=results.index)

    for firm in historical_polls['pollster'].unique():
        sum = 0
        for party in parties:
            sum = sum + abs(results[party] - historical_polls[historical_polls['pollster']==firm].set_index('year')[party])*historical_polls[historical_polls['pollster']==firm].set_index('year')[party]/120
            days = historical_polls[historical_polls['pollster']==firm].set_index('year')['days_before']
        final_frame[firm] = sum

    for firm in historical_polls['pollster'].unique():
        means = final_frame.mean(axis=1)
        final_frame[firm] = abs(final_frame[firm] - means)

    total_error = pd.DataFrame(final_frame.mean(axis=0))
    av_error = total_error.mean()[0]
    print av_error
    df = 1- (final_frame.mean(axis=0) - av_error)
    df.to_csv('poll_weights.csv',sep=',')

This produces the following output:

    Dahaf               1.412384
    Dialog              1.303897
    Geocartography      1.352617
    Jpost               1.425932
    Maagar Mochot       1.137197
    Midgam              1.271375
    New Wave            0.831736
    Panels              1.176537
    Shvakim Panorama    0.585856
    Smith               0.635624
    Sof Hashavua        0.470412
    Teleseker           0.396433
    dtype: float64
    [Finished in 1.2s]

Having produced a series of reliability weightings, I scraped Wikipedia for opinion polls for this year's election in the last thirty days (following methodology from 538 where polls beyond this period lose their utility) (israeli_2015_polls.csv). We have to combine the reliability weightings with a recency weighting: more recent polls are weighted more highly. We're going to use the brilliant datetime package to sort out all the dates. 

    import datetime
    import numpy as np
    import pandas as pd

    polls = pd.read_table('israeli_2015_polls.csv',delimiter=',')
    polls['date'] = pd.to_datetime(polls['date'],dayfirst=True)
    poll_ratings = pd.read_csv('poll_weights.csv',delimiter=',')
    poll_ratings.columns = ['pollster','rating']

    today = datetime.datetime(2015,3,12)

The following function weights polls in the average according to their recency. 

    def exp_decay(days):
        days = getattr(days,"days",days)
        return .5 ** (days/30.)

We now inner-merge the poll data with the pollster reliability ratings to get a single table, and add in the recency weights to each poll (I briefly forgot the nice pandas way to add columns like this and did it the dumb way with a list). 

    polls = polls.merge(poll_ratings, how="inner", on="pollster")

    recency_weights = []
    for i in range(0,len(polls['date'])):
        recency_weights.append(exp_decay(pd.to_datetime(today,dayfirst=True)-polls['date'][i]))

    polls['recency_weights']=recency_weights

Now we put everything together and add up the average to get a nice poll aggregate:

    parties = ["L", "YB", "YA", "ZC", "BY", "S", "UTJ", "M", "A", "Y", "K"]

    for party in parties:
        print party+": " + str(np.round(np.sum(polls['rating']*polls['recency_weights']*polls[party]/(polls['rating']*polls['recency_weights']).sum()),2))

This produced the following output on March 13, four days before the election with the inclusion of the final polls before the four-day embargo:

    L: 22.66
    YB: 5.56
    YA: 12.04
    ZC: 23.76
    BY: 12.05
    S: 6.87
    UTJ: 6.77
    M: 5.24
    A: 12.49
    Y: 4.2
    K: 8.49
    [Finished in 1.0s]

There's a few other intricacies I'd like to add to the model in the coming days if I have time:

- performing the aggregate on votes rather than seats and then assigning seats using the Knesset method, including surplus-vote agreements
- adding in weighting for sample sizes (these are very hard to come by for Israeli polls which doesn't sit well with me)
- adjusting for trends to give a forecast for election day (the current model gives a snapshot of what would happen if the election were held today)
- change to a probabilistic model which simulates 10 000 elections and gives probabilities of winning
- add some sort of analysis of Phase 2 of the electoral process, including potential coalitions etc (this is fraught with difficulty however)

**UPDATE** (after the election): My model, like all the polls it aggregated, did not perform very well. Even adding the trend adjustment could not have anticipated the morally questionable tactics used by Netanyahu to increase his seat count in the Knesset. The main lesson I took out of this, other than learning how to build a poll aggregator, is how difficult Israeli elections are to predict. It should be mentioned that the two main sources of error are my estimates of Likud and Habayit Hayehudi; without Netanyahu's last-minute cannibalisation of these votes, my model would have been fairly accurate. 
