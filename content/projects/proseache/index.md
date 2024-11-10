---
title: prose.ache
seo_title: proseache
summary: A word game for iOS inspired by Scrabble and Tetris.
slug: proseache
author: Clinton Boys

draft: false
date: 2022-12-12T03:52:30-05:00
lastmod: 
expiryDate: 
publishDate: 

portfolio_image: proseache.png
feature_image: proseache.png

project types: 
    - Game

techstack:
    - Typescript
    - React Native
    - iOS
---

# prose.ache

*December 12, 2022*

prose.ache is a word game I built for iOS using [React Native]({{< ref "posts/react-native" >}}), inspired by Scrabble and Tetris. I chose the name because it is reminiscent of the word "prosaic", and the obscure mechanic that drives the game can make your head hurt a bit. 

My friend and I were looking for a good way to learn React Native, and decided that making a word game would probably be a good way to do it (Wordle was big in 2022). So we started off playing around with an idea based on Conway's Game of Life; my friend's game forked into a sort of candy crush-inspired word game, and mine became this interesting mash of ideas from Tetris and Scrabble. 

In the first screenshot below, you can see the dual influence: the tiles are coloured according to their "state" in the Game of Life simulation: red tiles are about to "die", and other colours are about to "spawn" new tiles in the next iteration. 

![First](first.png)

I quickly realised that the randomness of Game of Life isn't particularly conducive to interesting word games, so I brought in a Tetris mechanic: the user is given some blocks of tiles, that can be placed on the board as a single unit. The seeds corresponded to "wild cards" that you could choose to be whatever letters you liked, and to win the level you needed to form the "goal word" written at the top. The working title at this point was "Tetrisble", a mix of "Tetris" and "Terrible" because I hadn't worked on the design at all yet. 

![Second](second.png)

This mechanic ultimately stuck, though I got rid of the seeds and made the tiles rotateable. The "harvest" 

![Third](third.png)

Finally I managed to work on the design. I made the board look a bit like a crossword puzzle and used Scrabble-y fonts to make it all look a bit nicer. "Harvest" turned into a "cut" mechanic, where if you managed to spell a word that was in the dictionary, but not the goal word, on the board, you could cut it out and have it come down again as a tile. This mechanic actually allowed for a fairly interesting game!

![Final](final.png)

