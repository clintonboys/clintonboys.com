---
layout: post
title: Pitchfork and my iTunes library 
date: 2015-03-30T21:21:46-05:00
lastmod: 2015-03-30T21:21:46-05:00

feature_image: sample-image-7.jpg
feature_image_alt: Spencer Butte, Oregon, 2013
---

# Pitchfork and my iTunes library 

*March 30, 2015*


I listen to a lot of music and for more than a decade now my main source of discovering new music has been [Pitchfork.com](http://www.pitchfork.com), particularly since all my friends only listen to hard trap and hip-hop so getting diverse recommendations from them can be difficult.

Pitchfork is a fairly divisive source of musical recommendations. Some people swear by it; some people hate it. I think Pitchfork is quite a useful source of music discovery, and I think they have some great writers on staff, especially for many of the genres I like. I don't swear by it, and I do try to read other sources for recommendations, but I think my musical tastes are heavily influenced by the website. 

I decided to try and quantify exactly how much of my music taste and listening preferences are influenced by Pitchfork.com. 

This required me to obtain two things:

- Pitchfork review data. Thankfully someone had already scraped this [here](http://jmduke.com/posts/analysing-pitchfork-using-pandas/) (this page is worth a read). 
- My iTunes library data. I got a new computer quite recently so I unfortunately only have about 18 months of listening data, and I listen to more than half of my music in Spotify now. This should be enough to get an idea of my listening habits however. I used the [pyiTunes](https://github.com/liamks/pyitunes) tool to convert the iTunes XML export to a useful Python object. 

First we look at the average score associated to a Pitchfork review:

    reviews = pd.read_csv('reviews.csv')
    print np.round(np.mean(reviews['score']),3)

    6.974
    [Finished in 0.5s]

This is a pretty high average score! It turns out the artists that I listen to have a higher average score though:

    library = Library('Library.xml')
    artists_with_plays = []
    for id, song in library.songs.items():
        if song.play_count > 0:
            artists_with_plays.append(song.artist)
    artists_with_plays=list(set(artists_with_plays))
    means = []
    for artist in artists_with_plays:
        means.append(np.mean(reviews[reviews['artist']==artist]['score']))
    means = [x for x in means if not math.isnan(x)]
    print "Average Pitchfork score of artists: " + str(np.round(np.mean(means),3))

    Average Pitchfork score of artists: 7.427
    [Finished in 16.7s]

This isn't a huge increase; only about 6.5%. Let's work out the average **weighted by play count** now. We change the code a little bit:

    def GetMeanRating(artist):
        return np.mean(reviews['score'][reviews['artist']==artist])

    artists_with_plays = {}
    for id, song in library.songs.items():
        if song.play_count > 0:
            artists_with_plays[song.artist] = artists_with_plays.get(song.artist,0)+song.play_count
    means = []
    total_plays = 0
    for artist in artists_with_plays.keys():
        means.append(GetMeanRating(artist)*artists_with_plays[artist])
        if not math.isnan(GetMeanRating(artist)):
            total_plays = total_plays + artists_with_plays[artist]
    means = [x for x in means if not math.isnan(x)]
    print "Average play-weighted Pitchfork score of artists: " + str(np.round(np.sum(means)/total_plays,3))

    Average play-weighted Pitchfork score of artists: 7.590
    [Finished in 16.3s]

This is an increase of nearly 9% on the review mean. This analysis is a little imperfect because I haven't compensated for the fact that the artist names in the two different datasets may not be the same (for example even if they are capitalised differently they won't match with the code I've written above). This is a small issue however. I'd like to add in my Spotify listening data and old Last.fm data if I get a chance to get a fuller picture of precisely how much of a Pitchfork sycophant I am. I'd also like an idea of how my listening habits have changed over time. 

