---
layout: post
title: Lifetime flight simulator
date: 2015-07-02T21:21:46-05:00
lastmod: 2015-07-02T21:21:46-05:00

feature_image: sample-image-22.jpg
feature_image_alt: Royal National Park, New South Wales, 2014
---

# Lifetime flight simulator

*July 2, 2015*

I spent a few hours today writing a basic first draft of a data-driven text-based "game" which demonstrates just how safe air travel is. The code for the game is all available in [this](https://github.com/clintonboys/lifetime_flight_simulator) GitHub repository.

The game, written in Python, simulates an entire lifetime of air travel. I use a database of real-world airports, destinations and flight distances, together with actuarial tables; the idea is that every person who plays the game will die before they actually encounter the extremely unlikely event of an air disaster. Play the game and see if you can encounter an air disaster before your unfortunate demise due to old age!

To play the game you need python and the scientific computing packages pandas and numpy installed; after that you can just download the files from Github and run `python lifetime_flight_simulator.py` from the directory. 

There's a few improvements I'd like to make: most of all I'd like to change the fatality data so it is different for different carriers. I'd also like to add some more interesting text to make the game more enjoyable to play.
