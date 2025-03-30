---
title: GreenChainer
seo_title: GreenChainer
summary: A routing application that builds urban walks through green spaces. 
slug: greenchainer
author: Clinton Boys

draft: false
date: 2025-03-19T02:12:30-05:00
lastmod: 
expiryDate: 
publishDate: 

portfolio_image: greenchainer.png
feature_image: sample-image-55.jpg
feature_image_alt: Nunhead Station, London, 2024

project types: 
    - Web application

techstack:
    - Typescript
    - React
    - Web
---

# GreenChainer

*March 19, 2025*

[GreenChainer](https://greenchainer.clintonboys.com) is a web application that I built a proof-of-concept for recently, inspired by the [Green Chain Walk]({{< ref "posts/green-chain-walk" >}}) in South London, where I live. I spend a lot of time walking, and one of the greatest things about this part of the city is the immense amount of green spaces, which have been famously "stitched" together in the Green Chain Walk, a fantastic 80 kilometre network of signposted routes connecting many of them together. This got me thinking: could I build an application that would automatically generate "green chain" routes between a given start and end point, of a given length? 

![GreenChainer screenshot](screenshot1.png)

To implement this idea, I needed to stitch a bunch of components together. 

- A map to display the user's chosen search location, green spaces, and the eventual route. 
- A geocoding API, to convert a text-based location search string like "New York City" into coordinates to centre the map around. 
- An API to find green spaces within a given radius of the searched location. 
- A routing API which supports walking routes. 
- A routing algorithm which creates the "chain" route through various green spaces nearby the searched location. I figured from the start that this step would require the most thought. 

I then had to throw all of these things together in a web application and deploy it somewhere. You can read below for the details of what I used to put everything together. 

## The map

I have some experience using [OpenStreetMap](https://www.openstreetmap.org/) (OSM), one of the greatest projects of the open internet alongside Wikipedia. It's a free, open source map of the entire world that anyone is free to contribute to. It doesn't have the richness of proprietary mapping services like Google Maps or Apple Maps, but in many parts of the world it is absolutely competitive with them, and it's completely free and open! So choosing it as the map layer for this project was a no-brainer. You can hook it into Java/TypeScript using [Leaflet](https://leafletjs.com), a nice mature library that supports many different mapping services, including OSM. 

## Geocoding

Geocoding is an interesting problem: I wrote a bit about my first experiences with it [here]({{< ref "projects/israeli-constituencies" >}}) when I was trying to do something a bit more complicated. The use case here is quite simple: just a search bar that the user can enter in text (which I will assume is specific enough and doesn't ned to be "disambiguated") and have an API return coordinates. 

I used [Nominatim](https://nominatim.org), a geocoding services based on OSM which offers a generous free API for simple applications like what I am building here, provided you adhere to their [usage policy](https://operations.osmfoundation.org/policies/nominatim/). It works very nicely provided you are clear enough with your search query.

## Fetching green spaces

Green spaces, like parks, commons, woodland etc, have special metadata within the OSM map. There is an additional API, called [Overpass](https://dev.overpass-api.de/overpass-doc/en/preface/preface.html), which provides search functionality for OSM. So for the use case I needed, you can provide coordinates and a radius, and have the API return a list of "points of interest" of certain types within that area. For the initial version of the application I use the API to search exclusively for places labeled "park" on the map, but this could be easily extended to the many other different types of "green spaces" that OSM allows for. 

## Routing API

Once we have a location and a list of green spaces, we need to build an interesting route between them. For this we need a routing API - something that takes in a start and end location and returns a route between them that satisfies certain criteria. Usually this will be the "shortest route", and in this case I want that shortest route to follow walking routes and not just roads that can be driven. I used [OpenRouteService](https://openrouteservice.org) (ORS), which is related to the OSM "ecosystem" and provides a generous free tier, though you do need to pay if your requests exceed a certain monthly quota or you will get blocked. 

## Routing algorithm

Because there is no "greenest route" option in ORS (that's why I'm trying to make this project!) we will need a custom algorithm to build our "green chain". I devised a pretty simple POC algorithm here, which has as inputs the desired start and end points, as well as a list of green spaces in the radius and a desired walk length, and then checks for candidate "waypoints" from the list of green spaces until it finds a chained route between them that it thinks, based on a heuristic, will be close to the desired total length. 

This is definitely the most unfinished (and of course, the most interesting and important) part of the project. It doesn't work anywhere near as well as I would like it to, and I'm hoping to find some time to improve it in the coming months. 

## Building the application

This is a single-page application so it felt like a natural fit for [React](https://react.dev) to me. I split the code into "frontend" and "backend", with a fairly simple React application in the frontend showing a map component, and then various boxes on the left hand side for the different phases of the UX flow:

- Enter a location and a radius, and press search to find green spaces within that radius around the location
- Choose a green space from the list as your start and end point
- Choose a desired route length
- View the route on the map and a summary of the route

## Deploying with Vercel

I have used [Vercel](https://vercel.com/) quite a bit now &mdash; this site is deployed there, along with a few other projects of mine. I hadn't use its "serverless functions" feature before though: essentially it gives you a very simple way to deploy a monorepo of frontend together with backend APIs it communicates with, without having to manage a separate deployment for the backend or worry about actual servers. It works fantastically well and was really easy to set up. 

## A word about "vibe coding"

I leaned heavily into AI coding tools for this project, mostly to see what they are capable of and understand if they really live up to the (rather incredible) amounts of hype that they are receiving at the moment. I used [Cursor](https://www.cursor.com/en), together with the Anthropic API running mostly Claude Sonnet 3.7, which I have found gives the best results for code at the moment. I spent about $15USD on API tokens and about four hours altogether getting this up and running, and mostly operated on the ["vibe coding"](https://simonwillison.net/2025/Mar/6/vibe-coding/) principle of letting the LLM write pretty much all of the code, including the configurations for the Vercel deployment. It did a pretty decent job of everything except the single part of this project which could be considered new or original: the routing algorithm that should make interesting "green chain" routes through public green spaces. So it seems like writing that part of the application is on me, and rightly so. 

The routing algorithm still needs work: the routes it produces are often a bit "unnatural": sometimes they cross over themselves, sometimes they avoid very obvious waypoints in favour of a main road. I think getting interesting, "naturally green" routes out of the application will be a proper challenge that will require adding additional things like entry and exit points for parks, and much more directionality information to the algorithm. 

It is however very nice to have something tangible that exists after such a short time, and I think that this is the best use case for LLMs right now. I would have no idea how to use them to get a routing algorithm that works like I would expect from the finished, polished version of the product I am trying to build here. But they were able to get a "minimal viable" version (depending on how you define viable) in a fraction of the time it would have taken me to create it from scratch by hand. That's definitely valuable, but it's still not something that can replace getting your hands dirty and [doing the actual work]({{< ref "posts/llms-jobs" >}}). 
