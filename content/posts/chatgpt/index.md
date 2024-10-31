---
layout: post
title: This is your brain on ChatGPT
date: 2023-04-21T21:21:46-05:00
lastmod: 2023-04-21T21:21:46-05:00

categories:
  - LLMs

feature_image: sample-image-57.jpg
feature_image_alt: Sdei Boker, Israel, 2023
---

# This is your brain on ChatGPT

*April 21, 2023*

Imagine the not too distant future. All menial tasks have been outsourced from our brains to generative AI models like the one that powers ChatGPT. Always the introverts, humanity has eschewed advanced forms of interaction with the models like speech and VR and prefers to communicate with the AI through text, or apps which wrap the text interface with something a little higher level.

Everything, in this future, will be done through our phones or their descendants. Not just social interactions, like today, but also the phrasing and preparation of text to send to friends and family. “Send Jane a heartfelt message that I hope she gets well soon.” “Tell Mum I can’t come to dinner and make it sound like I am really sad about it.”

I fear dreadfully this future, which seems to me to be the future that AI hawks are betting on and building today. Does this process of drawing a line under the sum of human knowledge (in publicly accessible text format at least) and saying “alright, let’s just base everything in the future off this”: does this sound macabre and ghoulish to no one but me? Putting aside the mathematical, engineering and design triumphs of large language models for a minute, is this really what we want to use them for?

I read a lot of tech blogs and articles these days about how people are using ChatGPT to “automate away” the more mundane parts of their day. “Draft an email asking for a raise from HR”. “Write the boilerplate code for a new Ruby on Rails project.” “Write a Python function to check if a string contains non-ASCII characters.” “Remove all the formatting from these lines and return them as a column I can paste into a spreadsheet.” This feels benign to me, and with my limited experience the uplift in productivity and time-to-product is less than the hype (though not nothing). In the end, speed of typing the code was never really the bottleneck: you need to know why you wanted that function to check strings in the first place.

“Why does my input data contain non-ASCII characters” is not a question that ChatGPT can answer, at least out of the box, because your specific input data and any context about where it comes from is missing from its training set. Generative models like GPT have an elegant solution to this: you can provide context through a “prompt”, which helps guide the model to answer your question.

If one thinks carefully about what information one would have to provide in a prompt to get ChatGPT to answer the question correctly (a big asterisk on the "correctly" to come back to), I think one realises it’s not that much different than figuring out the problem oneself. That is to say: beyond any “really menial”, bottom-of-the-complexity-pile task, building the context in a complete and logical enough way that the model can use it to solve your problem is roughly equivalent to just solving the problem yourself.

And that brings us back to that “correctly”. For me the reason ChatGPT has not been a huge productivity booster is that I still spend a lot of time correcting its answers and, in more advanced sessions, encounter “hallucinations”, the industry term for when the model just straight makes stuff up. Again, the terminology is interesting here. We only say it’s making it up because we know the actual answer and it’s not what the model says: it is still falsifiable. But the model has no conception of that. Its answer matches its “maximum likelihood” bet on its internal construction of the world. This is the scariest thing about LLMs I think. Because the better the models get, the more accurate their representation of reality becomes, there will always be gaps, those gaps will just become harder and harder to notice as the places where they occur get further and further from our own models of the world.

It’s important to remember that LLMs are not magic, they are matrix multiplication. Our troubles understanding them come from our inherent troubles as human beings thinking in very-high dimensional space. It’s weird there. Models with billions of tuned parameters can and do find “abstractions”: linear combinations of vectors that correspond to some sort of syntactical unit. It is remarkable to know that the input data and the trained model are enough to give a probability vector whose first entry continues to generate such consistent and “human-like” text. But if we understand the models we should not be surprised that they can do this, because we have given them everything they need with decades of the collective written output of humanity (in English). 
