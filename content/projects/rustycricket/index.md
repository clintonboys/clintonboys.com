---
title: Rustycricket
seo_title: rustycricket
summary: A simple cricket simulator written in Rust. 
description: This is the first full description of a constructed language I have created. It's a hobby I have dabbled in for over twenty years. 
slug: rustycricket
author: Clinton Boys

draft: false
date: 2023-10-10T03:52:30-05:00
lastmod: 
expiryDate: 
publishDate: 

portfolio_image: cricket-sim.png
feature_image: IMG_3351.jpeg
feature_image_alt: Lord's Cricket Ground, London, 2024

project types: 
    - Technical

techstack:
    - Rust
    - Gamedev
    - ECS
---

# Learning two things at once - using Rust and ECS to build a cricket simulator

*October 10, 2023*

Here is a strategy for time-poor working parents who are trying to learn new things: try to learn two new things at once. That's what I did recently when trying to pick up a bit of [Rust](https://www.rust-lang.org). For the uninitiated, Rust is a fairly new, relatively low-level "systems programming" language with an emphasis on speed and safety. I've been wanting to learn Rust for a while, and have been looking for a side project that could work as an excuse. 

In my experience the *subject* of a side project, if you want it to be successful and to actually have a chance of finishing it or learning something from it, needs to be something you are passionately interested in (even if the passion is fleeting). I have lots of posts on this site with details about side projects related to my interests: [elections]({{ site.baseurl }}{% link _posts/2015-01-25-aus-election-model-7.md %}), [music]({{ site.baseurl }}{% link _posts/2015-03-30-itunes-and-pitchfork.md %}), [politics]({{ site.baseurl }}{% link _posts/2019-12-21-uk-av-sim.md %}), [emacs]({{ site.baseurl }}{% link _posts/2020-05-20-emacs-i.md %}), [mathematics]({{ site.baseurl }}{% link _posts/2020-09-01-kepler.md %}). So for this project I chose another interest: cricket. 

And here comes the second thing I wanted to learn: the ECS (Entity Component System) programming paradigm, commonly used in game development. So the project comes into shape: use Rust, and an ECS framework, to build a cricket simulator. Sounds like fun!

Initially I had thought to just build out a scoreboard that updates as you click through the deliveries of the game. This would definitely give me enough to work on, learning how to set up all the entities I need, the components, the systems that update the scoreboard. But I figured it would be a little boring to look at, so decided in the end to make a visualisation of the ground and even animate the ball being bowled, hit and fielded. 

To do all of this, I used [rltk](https://github.com/amethyst/bracket-lib), a game engine for Rust, originally designed for "Roguelikes", a type of retro computer game with procedurally generated graphics and a "dungeon crawl" RPG mechanic. rltk provides a lot of very helpful structures to get you up and running; I just render a simple black square and use ASCII art to fill out my field, players, pitch, stumps and scoreboard. 

![Cricket sim](cricket-sim.png)

At first I just hardcoded to make sure it rendered correctly. Then I set about replacing all of the things you see in the image above with *entities*, *components* and *systems* according to the ECS paradigm. 

For example, there is a `DisplayGlyph` component which contains the information required to display the correct symbol for a player (batsman, bowler, fielder, keeper, umpire). Then there's the `Position` component which describes where on the map to render the symbol. If you then insert an entity into the game, and populate it with components, you can define a `display_system` to make sure the glyphs are rendered in their correct positions every loop. 

Similarly, we have `bowling_system`, `batting_system`, `fielding_system` which moves everything around the map according to logic, alongside the `scoreboard_system` which updates the scoreboard and the `match_system` which determines the ultimate winning logic and ends the game. 

![Cricket sim 1](cricket-sim-2.png)

Overall this exercise was really fun and it taught me a lot about game development, ECS and in particular Rust. Rust feels really well suited to building games: its neat "structs", cruel but fair type system and ingenious borrow checker are all very useful when you are writing code that needs to be performant and run every click. Writing a game also makes you think a lot harder about the loops you write, about data structures and memory and CPU efficiency. I enjoyed it a lot. 

The code for this project is available on my [Github](https://github.com/clintonboys/rustycricket). 

## Links and resources

- A very quick [half-hour](https://fasterthanli.me/articles/a-half-hour-to-learn-rust) introduction to Rust. 
- A really nice [tutorial](https://os.phil-opp.com/) on writing a bare-bones operating system in Rust. 
- A fantastic [guide](https://bfnightly.bracketproductions.com/chapter_1.html) on writing a roguelike in Rust using rltk. 
- A nice [post](https://robert.kra.hn/posts/rust-emacs-setup/) on setting up emacs for Rust development.
- 100 [exercises](https://rust-exercises.com) to help to learn Rust. 

