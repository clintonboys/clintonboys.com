---
layout: post
title: Forecasting Australian elections - the tricky seats
image:
  feature: sample-image-10.jpg
  credit: Stella Maris, Haifa, Israel, 2014
---

In this post I want to look at the most difficult seats from the 2013 election for my basic model: those eleven seats whose final two candidates in the runoff process were *not* the ALP and the Coalition (more technically: their two-candidate preferred result was not a two-party-preferred result). Hopefully a closer analysis of these seats will give me an idea of how to properly set up the model to account for seats of this type. Below is a list of these seats, the top two parties, and in brackets the party which placed third.

    Fairfax     (PUP v LNP) (ALP 3)
    Indi        (IND v LIB) (ALP 3)
    Kennedy     (KAP v LNP) (ALP 3)
    Melbourne   (GRN v ALP) (LIB 3)
    Denison     (IND v ALP) (LIB 3)

    Wills       (ALP v GRN) (LIB 2)
    Batman      (ALP v GRN) (LIB 3)
    New England (NAT v IND) (ALP 3)

    Mallee      (NAT v LIB) (ALP 3)
    Durack      (LIB v NAT) (ALP 3)
    O’Connor    (LIB v NAT) (ALP 3)

I've grouped the seats into three types, but before that it's important to notice one thing: no matter what the top *two* candidates, the Coalition and the ALP are *always* in the top *three*. I haven't checked yet but I would imagine there are no historical exceptions to this in the last fifteen years.

The first group are the five seats where either the ALP or the Coalition did not win the seat. The second group are seats where the ALP or Coalition won the seat, but there was a non-traditional second place. The third group are within-Coalition seats: seats where the top two candidates were the Liberals and Nationals. These are the least important as presumably they are easy to forecast for the Coalition!

Let's look at the seats more closely. For the first five seats, my model by definition got these wrong as it only expected ALP or Coalition victories. Let's see how hard these would have been to predict (and try not to overfit as we go!)

**Fairfax**: PUP 50.03, LIB 49.97 (2013)

The main ingredient missing here is a measure of the personal vote of PUP leader Clive Palmer. This is a difficult parameter to estimate: we need to give some measure of an improvement on the swing, and an idea of which parties it comes at the expense of. This is made harder by the fact that PUP did not exist before this election, and the seat was not polled. Assuming we get the top two parties right, we also need to estimate how the ALP's preferences will distribute between PUP and the Coalition.

**Indi**: IND 50.25, LIB 49.75 (2013)

Another very close contest which a non-traditional party lost. This was a little easier to predict as a poll of this marginal seat showed the Independent candidate gaining ground (since the candidate was an established figure there was significant media interest). Extrapolating the trend to election day, and correctly estimating the distribution of ALP preferences, would probably have done alright with this seat. 

The two seats above were both very close, in addition to being non-traditional contests. The three below are easier as they are not marginal seats. 

**Kennedy**: KAP 52.19, LIB 47.81 (2013)

Since Bob Katter (who held the seat in 2010 with 68.34%) is the sitting member, this seat would have been predictable with some measure of his personal vote, and the correct distribution of ALP preferences.

**Melbourne**: GRN 55.27, ALP 44.73 (2013)

This seat was polled twice; with the correct distribution of LIB preferences it would have been predictable. 

**Denison**: IND 65.51, ALP 34.49 (2013)

As with Kennedy, with a correction for the personal vote of Andrew Wilkie and the right distribution of Liberal preferences, this seat would have been straightforward. 

**Wills**: ALP 65.20, GRN 34.80 (2013)
**Batman**: ALP 60.61, GRN 39.39 (2013)

These two seats feature extremely high Green votes and are easy to correct for with the right distribution of Liberal votes. 

**New England**: NAT 64.46, IND 35.54 (2013)

This is a subtle seat, as it was held by a strong independent (Tony Windsor) for many years before passing to Nationals member Barnaby Joyce in 2013. Since Joyce polled over 54.21% of the primary vote it is a moot point really.

**Mallee, O'Connor, Durack**: I am not concerned about modelling these types of seats, as my model will just award them to the Coalition, being unconcerned with their infighting in Western Australia. 

The model thus only needs to incorporate a few things to be able to predict occurrences like the above:

- estimate ALP and LIB preferences to other parties when necessary (can use historical data for this)
- estimate personal vote corrections for particular members (Peter Brent does something like this in a pretty well-justified way although his entire website lives behind a paywall now)
- incorporate marginal seat polls




