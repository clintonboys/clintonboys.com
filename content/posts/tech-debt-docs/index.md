---
layout: post
title: The relationship between technical debt and technical documentation
date: 2023-12-02T21:21:46-05:00
lastmod: 2023-12-02T21:21:46-05:00

categories:
  - Software development
  - Documentation

feature_image: sample-image-62.jpg
feature_image_alt: London, UK, 2024
---

# The relationship between technical debt and technical documentation

*December 2, 2023*

Technical debt is a phrase that gets used a lot when building software and software companies. It refers to the process where deliberate decisions are made to build parts of a system with known flaws that are noted and will be addressed at some future point. There is a need to deliver a feature for some very good reason with a very hard deadline, and you can only make it if you compromise, do things manually, build something without thinking the design through fully. It happens all the time, especially in companies that grow quickly. 

But what happens when you make those changes, when you deliberately take on technical debt &mdash; as legitimate a decision as taking on capital debt to finance a mortgage or any other venture &mdash; and *don't document it anywhere*?

Think about what happens when you take out a mortgage. It's a very standardised and formal procedure. You need to decide how much money you want to put down, and accordingly how much debt you will take on. That debt accrues interest at an agreed rate, which is calculated along the life of the loan and amortised to give you nice monthly payments. "It will cost me \\$3,500 a month for 20 years to have \\$500,000 today." In my experience, nothing of the sort happens when you take on technical debt. Some parts of the analogy fail, of course: it's hard to define "interest" on technical debt, though it may be possible (think about assigning a dollar value to the number of working hours required to fix issues arising from the quick fix there wasn't enough time to test properly). But at the very least, we should be properly *documenting* these transactions, explaining why the decisions where made the way they were made, and "what the bet was": why did we choose to do it this way and not "properly". Very often these decisions do stand the test of time, particularly in early-stage companies where "moving fast and breaking things" can often be of existential importance. 

I think creating a huge amount of technical documentation, things like the design documents which Google is equally famous and infamous for, is the right thing to do when you are building things. You can't really write too much, provided you are actually thinking about what you are writing, honing what you have already written, and constantly getting feedback and input. If this is done correctly, the resulting documentation provides a very thorough account of the decisions and reasoning behind the acquisition of technical debt in the project. 

## Links and resources

- This is a decent [article](https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9520328) with a bit more detail about different approaches to managing technical debt. 