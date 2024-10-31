---
title: Conquering the last piece of the stack with React
seo_title: Conquering the last piece of the stack with React
slug: react
author: Clinton Boys

draft: false
date: 2022-08-18T21:21:46-05:00
lastmod: 2022-08-18T21:21:46-05:00

feature_image: sample-image-67.jpg
feature_image_alt: Blah

categories:
  - React
  - Software development

toc: false
related: true
social_share: false
newsletter: false
disable_comments: false
---

# Conquering the last piece of the stack with React

*August 18, 2022*

I first started programming when I was 16 (so 20 years ago). I have been writing mostly Python for a living, alongside SQL and a bunch of other backend and data things, for 8 years, did quite a bit of other hacky programming during the 4 years of my PhD, and have dabbled in many other programming languages and frameworks for fun and profit over the years. So I have quite a bit of experience writing code. But until very recently I had never touched anything close to the mythical front-end (aside from building and deploying static sites like this one, but I hardly think that counts).

Learning front-end development as an experienced developer is strange. I learnt React, a Javascript web application framework, and wrote Typescript, which was also new to me and which I quite like. Because I already know how to program, and picking up a new programming language comes fairly easily to me, most of the real difficulty is conceptual, and you do really have to think differently when programming front-end. Performance is crucial, since users feel it as lag between their mouse clicks. Separating state from flow becomes imperative, since without it there is no way to keep track of everything and to manage the abstractions.

React, and particularly if you add Redux to the mix, really gives an ergonomic and satisfying way to do this. It handles all of the rendering, making the behaviour of the program and how it updates and manages the state of components all automatic, according to some (ostensibly) very simple inheritance rules. 

If you're like me, a technical person with a fair amount of programming experience but has not written a line of front-end code in their life, I think React and Typescript are a good place to start. In fact even if you have been writing Python for ten years (or twenty!), I think it's a better idea to learn something new for front-end development, instead of trying to learn Django or Flask or some other Python-based framework. 

Just like there is a "stack" in backend / systems programming, most of which you never interact with (TCP/IP, machine code, compilation, garbage collection, etc), the same is true of front-end programming. Frameworks like React handle rendering, dynamic sizing between devices, communication with backend APIs, and the dynamic building of HTML components based on user input and state. It's a very different world but it's fun out there. 

## Links and resources

- A nice [explanation](https://www.joshwcomeau.com/react/why-react-re-renders/) of the most counter-intuitive bit of React and similar frameworks coming from the backend: its re-rendering logic. 
- [redux](https://redux.js.org/tutorials/essentials/part-2-app-structure) seems to be the state-of-the-art way to manage state in a React app of a certain complexity. 
- [Guide](https://vxlabs.com/2022/06/12/typescript-development-with-emacs-tree-sitter-and-lsp-in-2022/) to Typescript development in emacs.