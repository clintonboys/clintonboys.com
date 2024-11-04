---
layout: post
title: Correcting for reliability in Australian election polls
date: 2015-01-25T21:21:46-05:00
lastmod: 2015-01-25T21:21:46-05:00

feature_image: sample-image-11.jpg
feature_image_alt: Blue Mountains, New South Wales, 2011
---

# Correcting for reliability in Australian election polls

*January 25, 2015*

In a [post]({{< ref "posts/aus-forecasting" >}}) last year, I discussed the difficulties in building a model for predicting Australian elections. In the next series of posts, I want to build a few basic pieces of this model. 

The first piece of the model I want to build is a series of reliability weights for pollsters. First let's have a look at who the main pollsters are in Australian elections.

**Newspoll** - The best-known and most influential pollster. Polls Federal and State elections since 1985, using random telephone number selection. Only calls landlines. 

**Morgan** - The oldest pollster. Has polled Federal elections since the 1940s, and also polls State elections. Traditionally a door-to-door pollster, in recent years has updated its model to include SMS and internet sampling. 

**Galaxy** - Fairly recent pollster, polling Federal elections since 2004, and some recent state elections. Uses random telephone number selection and includes mobile phones. 

**Nielsen / Ipsos** Nielsen used to conduct polls for Fairfax newspapers but stopped in 2014. It has been replaced by Ipsos. Telephone pollster that calls landlines and mobiles (Nielsen used to only call landlines).  

**ReachTEL** - Automated dialling pollster. Polls both Federal and State elections. 

**Essential** - The pollster used by Crikey. Polls using email. Only polls Federal elections. 

There are other minor pollsters floating around but we won't have enough data on them to create a weighting. We'll have to come up with a rule to assign polls not on this list a weight in the model.

Let's look at elections in Australia in the last ten years. There have been eighteen elections for either the Federal government or the state governments in NSW, QLD, VIC, SA and WA since then (we exclude the territories, and TAS because its system is completely different to the others).

I want to calculate accuracy for the firms above for whenever polled these elections; we will just use the final poll they released before election day. We'll use primary and TPP (two-party-preferred) data for our calculations. Some pollsters won't have all eighteen data points because they only poll federal elections. 

Collecting the state polling data took a really long time. Federal data has been collected and curated by Phantom Trend and is available in a Github repo. There's no such luck for state data though, so I had to get it all myself. 

Newspoll data is all available on their website in a fairly accessible form. Morgan data is also available but hidden in single media releases for each poll so it's a bit of a pain. The other pollsters are much more opaque with their data. Galaxy was helpful and actually responded to an email request with a whole bunch of data. 

I'm keeping all the code for my model on a Github repository [here](https://github.com/clintonboys/emma-chisit). I've called the model [*Emma Chisit*](https://en.m.wiktionary.org/wiki/Emma_Chisit). 

After spending countless hours scraping polls, I was ready to build the poll weight calculator. Because I'm on a bit of an object-oriented binge at the moment, I decided to do it this way. First we create a poll class, and then a special inheritance for elections. 

    import pandas as pd
    import numpy as np
    from collections import OrderedDict

    parties = {'ALP', 'LIB', 'NAT', 'COA', 'DEM', 'GRN', 'ONP', 'PUP', 'KAP', 'FF', 'CD', 'OTH'}
    states = {'AUS', 'NSW', 'VIC', 'SA', 'WA', 'QLD', 'TAS'}

    class Poll(object):

        def __init__(self, pollster, state, mediandate, samplesize, results, TPP):
            self._pollster = pollster
            self._state = state
            self._mediandate = mediandate
            self._samplesize = samplesize
            self._results = results
            self._tpp = TPP
            self.distance = 100000  # This variable will be used to find   closest polls to elections

        @property
        def pollster(self):
            return self._pollster

        def state(self):
            return self._state

        def median_date(self):
            return self._mediandate

        def sample_size(self):
            return self._samplesize

        def results(self,party):
            try:
                return self._results[party]
            except KeyError:
                return 0

        def change_result(self,party,new):
            try:
                self._results[party] = new
            except KeyError:
                pass

        def tpp(self):
            return self._tpp


    class Election(Poll):

        ## elections are just polls with a huge sample size

        def formal_votes(self):
            return self._samplesize

        def election_date(self):
            return self._mediandate

Now we import all the data and initialise polls and elections for all the entries. 

    def LoadPolls(state):
        poll_list = []
        filename = 'polling_data/' + state + '_state_polls.csv'
        pollframe = pd.read_csv(filename)
        for i in range(0,len(pollframe)):
            results_dict = {}
            for party in parties:
                try: 
                    results_dict[party] = pollframe[party][i]
                except KeyError:
                    pass
            try:
                poll_list.append(Poll(pollframe['Pollster'][i], state, pd.to_datetime(pollframe['PollMedianDate'][i]), pollframe['N'][i], results_dict, pollframe['ALP_TPP'][i]))
            except KeyError:
                poll_list.append(Poll(pollframe['Pollster'][i], state, pd.to_datetime(pollframe['PollMedianDate'][i]), pollframe['N'][i], results_dict, np.nan))
        return poll_list

    def LoadElections():
        electionframe = pd.read_csv('elections_from_2000.csv')
        election_list = []
        for i in range(0,len(electionframe)):
            results_dict = {}
            for party in parties:
                try:
                    results_dict[party] = electionframe[party][i]
                except KeyError:
                    pass
            election_list.append(Election('Election', electionframe['State'][i], pd.to_datetime(electionframe['Date'][i]), electionframe['N'][i], results_dict, electionframe['ALP_TPP'][i]))
        return election_list

Once we've done this the code for computing weights is pretty simple. The only clever thing we need (and that the object-oriented approach really helps with) is working out which polls are the closest to the respective elections for their pollsters. I'm using a fifteen day cutoff. The code could definitely do with some optimisation, although the largest amount of polls I'm ever going to be working with is a few thousand, so there's not much need to make it faster. 

    error_dict = {}

    for pollster in pollsters:
        error_dict[pollster] = []
        for election in elections_from_2000:
            potential_list = []
            for state in state_polls:
                for poll in state:
                    if poll.state() == election.state():
                        if poll.pollster == pollster:
                            if 0 < -(poll.median_date() - election.election_date()).days < 15:
                                potential_list.append(poll)
                                poll.distance = -(poll.median_date() - election.election_date()).days
            try:
                min_dist = min(potential_list, key=attrgetter('distance'))
                error_dict[pollster].append([min_dist,election])
            except ValueError:
                pass

We need some helper functions to put everything together; since different pollsters poll different groups of "others", and some include the Nationals and some don't, we need to make everything consistent. 

    def JoinCoalition(poll):

        if np.isnan(poll.results('NAT')):
            poll.change_result('NAT', 0)
        if np.isnan(poll.results('COA')):
            poll.change_result('COA', poll.results('LIB') + poll.results('NAT'))

    def JoinOthers(poll):

        others_vote = 0
        for party in others:
            if not np.isnan(poll.results(party)) and poll.results(party) != 0:
                others_vote = others_vote + poll.results(party)
        poll.change_result('OTH', others_vote)

Now we compute root-mean-squared deviation error for all the polls and average everything up. 

    def ComputeRMSQ(poll, election):

        to_sum = []
        count = 0
        for party in joined_parties:
            resid = poll.results(party) - election.results(party)
            try:
                to_sum.append(math.pow(resid,2))
            except TypeError:
                pass
            count = count + 1
        tppresid = poll.tpp() - election.tpp()
        if not np.isnan(tppresid):
            try:
                to_sum.append(4*(math.pow(tppresid,2)))
            except TypeError:
                pass
        count = count + 4

        return math.sqrt(sum(to_sum)/count)

    av_error = []

    for pollster in pollsters:

        errors = []

        for i in range(0,len(error_dict[pollster])):

            JoinCoalition(error_dict[pollster][i][0])
            JoinCoalition(error_dict[pollster][i][1])
            JoinOthers(error_dict[pollster][i][0])
            JoinOthers(error_dict[pollster][i][1])

            errors.append(ComputeRMSQ(error_dict[pollster][i][0], error_dict[pollster][i][1]))

        av_error.append(np.mean(errors))

    print np.mean(av_error)

This gives us the following average pollster errors, and total average error:

    Morgan    1.795
    Newspoll  2.768
    Galaxy    1.937
    Essential 1.891
    ReachTEL  3.249
    2.328
    [Finished in 0.8s]

From this we can compute the following weights to use in our model:

    Morgan    1.297
    Essential 1.232
    Galaxy    1.202
    Newspoll  0.841
    ReachTEL  0.716
    [Finished in 0.7s]
