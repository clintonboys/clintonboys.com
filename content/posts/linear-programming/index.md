---
layout: post
title: The ubiquity of linear programming
date: 2022-01-08T21:21:46-05:00
lastmod: 2022-01-08T21:21:46-05:00

categories:
  - Maths

feature_image: sample-image-64.jpg
feature_image_alt: Golan Heights, Israel, 2021
---

# The ubiquity of linear programming

*January 8, 2022*


[NP-hard](https://stackoverflow.com/questions/1857244/what-are-the-differences-between-np-np-complete-and-np-hard) problems are the most interesting and important class of computational problems. In my experience (and many others' I imagine), most hard optimization problems that arise in real applications, and remain interesting enough to keep looking at after an initial investigation, while also being approachable with heuristic methods, are NP-hard. 

There are many different and equivalent ways to state NP-hard problems in general. Indeed there is a famous [list](https://en.wikipedia.org/wiki/Karp%27s_21_NP-complete_problems) written by Karp in the early '70s of common NP-complete problems that any NP-hard problem can be “reduced to in polynomial time” to any one on the list. This has a precise meaning, but really just means you can just choose your favourite NP-complete problem and pretend that all NP-hard problems are just instances of it, up to some “Karp reduction” that is (at least theoretically) trivial. 

One of the problems on this list is “integer linear programming”, and I have always thought this gives the most natural language for formulating and understanding NP-hard problems. Most of the other problems on the list require some additional structure to be present: a graph, usually. But to write out a linear program formulation you just need to decide what your variables are, and write down all the constraints between them. It's very explicit, which can certainly help in the formulation stage when the precise definition of every single constraint in the problem may not be clear. 

Which problem from the list you use as the template for your specific problem, when it comes to actually *implementing* it, may be a different story altogether, one which depends on data structures, available commercial solvers, pre-existing additional structure in the problem, programming language choice and many other things. But I think that in the ideation and formulation stage, it is usually much easier to think about every problem as just a very large integer linear program. 
