---
layout: post
title: The curse of dimensionality and the weak law of large numbers
date: 2019-01-27T21:21:46-05:00
lastmod: 2019-01-27T21:21:46-05:00

categories:
  - Mathematics
  - Statistics

feature_image: sample-image-22.jpg
feature_image_alt: Royal National Park, New South Wales, 2014
---

# The curse of dimensionality and the weak law of large numbers

*January 27, 2019*

I was recently re-reading some fantastic course [notes](https://terrytao.wordpress.com/2015/10/23/275a-notes-3-the-weak-and-strong-law-of-large-numbers/) by the peerless Terence Tao on basic statistics from a fairly high mathematical standpoint as I wanted a quick refresher on a couple of things, and came across a very nice connection between two important and beautiful results which are fundamental to statistics and machine learning.

## The weak law of large numbers

The weak law of large numbers is an important theorem in statistics which underpins a lot of analysis and model-building. It tells us that the sample mean of independently, identically distributed random variables converges in probability to the expected value, with very weak assumptions on the random variable itself. This allows us to "assume normality" in a large number of cases, and lets us use the power of statistical tests based on the normal distribution in a large number of contexts. If you're not familiar with random variables, just think of rolling a dice: the weak law of large numbers tells us that if we roll a die enough times, and look at the proportion of times we rolled a 6 out of all the rolls, this proportion will approach \(\frac16\) as we roll the die more and more times. 

We can state the weak law of large numbers more formally as follows. Suppose we are given a sequence \(X_1, X_2, \ldots\) of [iid](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables) copies of a random variable \(X\) with expected value \(\mathbb{E}X=\mu\). If for each \(n\) we denote by \(Y_n\) the sum \(X_1+X_2+\ldots+X_n\), then the random variables \(Y_n/n\) converge in probability to \(\mu\), the true mean. 

The weak law of large numbers is of enormous consolation to casino operators. Indeed, suppose that the random variable \(X\) models the result of spinning a roulette wheel. Then at any given spin, let's denote it by \(X_i\), there is a chance of a significant loss; but over time we are guaranteed that the total loss per spin will converge to some \(\mu\), and we can calibrate the payouts accordingly so our bottom line is positive.

## The curse of dimensionality

If you think about a point in space being represented by three numbers (a simple generalisation of the familiar Cartesian plane from high-school geometry), then collections of \(n\) numbers represent points in some theoretical \(n\)-dimensional space which has no spatially interpretable meaning for \(n>3\). The curse of dimensionality is a catch-all used by statisticians and mathematicians to describe a bunch of highly counterintuitive behaviours which occur at these "non-spatial" dimensions, particularly when \(n\) is very large (i.e. thousands or even millions of dimensions). 

The most well-known, and most prone to cause issues, is the strange density property of high-dimensional space: in a very vague sense, paraphrasing Wikipedia, there is no space in the "middle" of a unit hypercube; and it is almost all "pushed" out to the corners. This is a weird idea, and it's even weirder that we can use the weak law of large numbers, a concept from statistics with seemingly little relation to high-dimensional geometry, elegantly to make this notion precise.

Let's state the connection now. Choose some quantity \(1 > \epsilon > 0\). Then for \(n\) sufficiently large, at least \(100(1-\epsilon)\%\) of the unit hypercube \([-1,1]^n\) is contained in the set 

$$
\{x\in \mathbb{R}^n\mid (1-\epsilon)\sqrt{n/3}\leq \left|x\right| \leq (1+\epsilon)\sqrt{n/3}\}.
$$

This equation might be a little hard to understand at first, particularly if you have never seen a set written like this before. It's describing the set of all points in \(n\)-dimensional space whose "distance" (denoted by the bars \(\mid\) around \(x\)) satisfies some inequality: that it is larger than what is on the left and smaller than what is on the right. Now think about what happens if we choose a very very small \(\epsilon\). So then \(1-\epsilon\) is just a tiny bit smaller than \(1\) and \(1+\epsilon\) just a tiny bit larger, and we're saying that almost 100% of the hypercube's volume is contained in the infinitesimally small strip of points whose distance from zero is between \((1-\epsilon)\sqrt{n/3}\) and \((1+\epsilon)\sqrt{n/3}\). 

## Proof

Following Terence Tao's notes, we let \(X_1,X_2,\ldots\) be drawn uniformly from the interval \([-1,1]\) which gives 
a vector \((X_1,X_2,\ldots,X_n)\) uniformly distributed on \([-1,1]^n\).
Their squares \(X_1^2,X_2^2,\ldots\) are also iid random variables and so if we let \(\mu\) represent 
the uniform measure on \([-1,1]^n\) we can compute their expectations as

$$
\begin{align*}
\mathbb{E}(X_i^2) &= \int_{\Omega}X_i^2d\mu \\
&= \int_{[-1,1]^n}X_i^2d\mu \\
&= 2^{-n}\int_{[-1,1]^n}x_i^2dx_1dx_2\cdots dx_n,
\end{align*}
$$

since the uniform probability measure on \([-1,1]^n\) is $$2^{-n} \prod_{i=1}^n dx_i$$
 (since each interval has length 2). This then equals
 
$$
\begin{align*}
2^{-n}&\int_{-1}^1\int_{-1}^1\cdots\int_{-1}^1 x_i^2dx_1dx_2\cdots dx_n \\
&= \frac{1}{2} \int_{-1}^1 x_i^2 dx_i \\
&= \int_0^1 x_i^2 dx_i\\
&= \frac{1}{3}. 
\end{align*}
$$ 

The weak law of large numbers tells us that the quantity \(\frac{X_1^2+\ldots+X_n^2}{n}\) converges in probability to \(\frac{1}{n}\sum_{i=1}^n\frac13=\frac13\), which means that for a given epsilon we can find \(n\) such that

$$
P\Bigl(\frac{X_1^2+\ldots+X_n^2}{n} - \frac13\Bigr) < \epsilon,
$$

i.e. \(P(X_1^2+\ldots+X_n^2 - \frac{n}{3}) < \epsilon\), and taking square roots of both sides we see this is precisely the definition
of \((X_1,\ldots,X_n)\) lying in the region described above. 
