---
layout: post
title: Deep learning and the universal approximation theorem
date: 2018-05-28T21:21:46-05:00
lastmod: 2018-05-28T21:21:46-05:00

categories:
  - Mathematics
  - Machine learning

feature_image: sample-image-49.jpg
feature_image_alt: Eden, New South Wales, 2018
---

# Deep learning and the universal approximation theorem

*May 28, 2018*



Deep learning, and in particular deep neural networks, is one of the most popular and 
powerful tools of modern data science. Using analogies from neuroscience, neural networks
provide a framework for building predictive models whose predictive power is seemingly 
limitless. They are at the heart of modern "artificial intelligence" wonders like smart 
assistants (Siri, Cortana, Google Assistant), smart speakers, self-driving cars and most 
modern image detection algorithms (Google image search, IBM Watson). 

This post will give a mathematically-slanted overview to neural networks, with the goal
of proving what could be referred to as the "Fundamental Theorem of Neural Networks". This
remarkable theorem is fairly accessible, and explains beautifully and precisely why neural 
networks are so powerful. 

## The mathematics of neural networks

A neural network is essentially a function approximation algorithm, modelled at a basic level
on the behaviour of neurons in the human brain. Although it is not a particularly common 
way of thinking as a data scientist, from a mathematical perspective machine learning 
is nothing more than function approximation with a probabilistic flavour. Under the assumption 
that the "true" relationship between a set of features $$X$$ and an output variable $$y$$ can be specified
by a function $$f(X, \theta)$$ which may depend further on some parameters $$\theta$$, the problem
of machine learning can be expressed as an attempt to approximate $$f$$ in a way which minimizes
a specified cost function (the choice of cost function is usually motivated probabilistically). 

For a given input $$X\in\mathbb{R}^n$$, a **neural network with a single hidden layer** is a finite linear combination of the form

$$
\sum_{j=1}^N\alpha_j\sigma(y_j^TX+\theta_j)
$$

where $$N,\alpha_j\in \mathbb{R}$$, $$y_j\in\mathbb{R}^n$$ and $$\sigma$$ is a special type of non-linear function we will discuss later. The $$\alpha_j$$'s are called the *weights*, the $$\theta_j$$ the *biases* and $$\sigma$$ is called the *activation function*. 

![Neural network](https://github.com/clintonboys/clintonboys.github.io/blob/master/_posts/nn.png?raw=true)

The above picture explains the analogy with the human brain; given an input vector $X$ (touch input from skin, audio input from the ears, etc.), signals are sent to various 
neurons which "activate" according to these inputs and a collection of weights. This behaviour then cascades through
various layers of the network, resulting finally in an output (don't touch the fire, say "yes", etc.). 

We will be less concerned in this article with the "machine learning" theory behind neural networks -- for
example I don't want to discuss the algorithms which are used to train the networks, or techniques for 
feature selection or choosing the right activation function or number of "hidden layers". Rather, we will
discuss a mathematical theorem which provides a solid theoretical basis for why neural networks are so powerful. 

## The universal approximation theorem

Universality theorems are omnipresent in mathematics. The setup is classic, and gives the illusion of a genius mind
at work, inventing a solution from thin air and then proceeding to prove it is the unique one which suits
a given set of circumstances. In actuality, the *workflow* is entirely opposite: first a family of functions or a 
mathematical object is studied by its occurrences in specific examples. Through careful study of these examples,
its utility becomes clear and the question of generalisation and universality arises. 

So seeing the above family of functions occurring in many different places, the natural question is: what can we use 
them for? The answer turns out to be just about everything: in a way which can be made mathematically precise,
neural networks with a single layer can be used to approximate any continuous function. Let's state this theorem a 
little more clearly. The following theorem comes from a [paper](https://www.dartmouth.edu/~gvc/Cybenko_MCSS.pdf) of Cybenko. A **sigmoidal** function is one which "looks" like a sigmoid: $$\sigma(x)\to1$$ as $$x\to\infty$$ and $$\sigma(x)\to0$$ as $$x\to-\infty$$.  

---

**Universal approximation theorem for neural networks (Cybenko)**

Let $$\sigma$$ be any continuous sigmoidal function. Then finite sums of the form 

$$
G(x) = \sum_{j=1}^N \alpha_j\sigma(y_j^Tx + \theta_j)
$$

are dense in the set $$C(I_n)$$ of continuous functions on the unit cube. 

---

For those who don't remember their undergraduate analysis, there is a theoretical definition of 
density [here](https://en.wikipedia.org/wiki/Dense_set), but for our purposes it is enough to think of it
as meaning that there are "enough" of these functions to be able to use them as "building blocks" to build
any function to any required level of accuracy. 

The proof of this remarkable theorem uses fairly standard functional analysis techniques. First we show that 
a slightly weaker but easier-to-work with family of functions (called **discriminatory** functions) 
satisfy the conditions of the theorem. Then it proceeds to prove, using a standard functional analysis method,
that sigmoidal functions belong to this category. 