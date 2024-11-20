---
layout: post
title: Regression
date: 2019-08-14T21:21:46-05:00
lastmod: 2019-08-14T21:21:46-05:00

categories:
  - Statistics
  - Mathematics

feature_image: sample-image-50.jpg
feature_image_alt: Majdal Shams, Golan Heights, 2019
---

# Regression

*August 14, 2019*

At work recently I gave a 90-minute colloquium talk on regression. We have a monthly series of talks where researchers and data scientists discuss fundamental topics at length, and although we'd had many interesting talks no one yet had given a thorough and solid introduction to regression theory. Seeing as I don't mind a challenge, I decided to give it a go.

It turned out to be quite a difficult thing to do, since the range of experience and knowledge in the room was quite vast, from statistics PhDs to computer science undergraduates, and the material is typically not presented all at once. I'm not sure how successful I was in my attempt, but I'm posting parts of the content of the talk here to hopefully provide a good background to people who are interested. 

## Introduction

Regression is *the art and science of estimating the relationships between variables*. We will revise the basic ideas behind regression, discuss some important theoretical results and then look into some more advanced topics and methods. 

## Linear regression

We have a set of \(p\) features \((x_1,x_2,\ldots,x_p)\) and are trying to use them to predict the value of a continuous dependent variable \(y\). 

**Examples**

- \(y\) is the height of a person and \(x_1, x_2,x_3\) are their age, mother's height and father's height.
- \(y\) is the expected arrival time of a delivery and \(x_1, x_2, x_3\) are its distance from the dropoff, the average driving speed in the city and the amount of rain. 


The simplest possible non-trivial model is linear: let us assume that \(y\) changes as some linear combination 

$$
y = \beta_0 + \sum_{i=1}^p \beta_i x_i
$$

of the \(x_i\). How can we find the coefficients \(\beta_i\)?

The answer is by using a collection of *training data*, i.e. a set of \(N\) vectors 

$$
(x_{11},x_{12},\ldots,x_{1p}), (x_{21},x_{22},\ldots,x_{2p}),\cdots,(x_{N1},x_{N2},\ldots,x_{Np})
$$

for which we know the true output values \(\{y_1,\ldots,y_N\}\), find the coefficients which minimise the overall sum of squared differences from the true values:

$$
\mathcal{RSS}(\beta_0,\ldots,\beta_p)=\sum_{i=1}^N \Bigl[y_i-\Bigl(\beta_0 + \sum_{j=1}^p \beta_i x_{ij})\Bigr]^2.
$$

**Easier:** reframe in vector notation \(x_i=(x_{i1},x_{i2},\ldots,x_{ip})\), \(X=[x_1,x_2,\ldots,x_N]^T\):

$$
\mbox{model: }\; y=X\cdot\beta,\quad \mathcal{R}(\beta)=\sum_{i=1}^N (y_i-x_i \cdot\beta)^2=(y-X\beta)^T(y-X\beta).
$$

This is a function of \(\beta\) which we can minimise using vector calculus to find the coefficients which give the best model. 

Differentiating with respect to \(\beta\):

$$
\frac{\partial \mathcal{RSS}}{\partial \beta}=-2X^T(y-X\beta)
$$

and setting to zero: \(X^T(y-X\beta)=0\), gives the solution

$$
\hat\beta=(X^TX)^{-1}X^Ty.
$$

We can now use our model to compute modelled values of \(y\) for any input vector \(x\):

$$
\hat y = \hat\beta\cdot x.
$$

In order to better understand statistical properties of this estimate, let's compute its mean and variance. 

Let's assume for the moment that this model captures the true underlying behaviour; that is, \(y=\beta X + \epsilon\) for some normally-distributed errors \(\epsilon\sim \mathcal{N}(0,\sigma^2)\). 
Then

$$
\begin{align*}
\mathbb{E}\hat\beta &= \mathbb{E}(\underbrace{(X^TX)^{-1}X^Ty}_{\text{definition of }\hat\beta}) = \mathbb{E}((X^TX)^{-1}X^T(\underbrace{\beta X + \epsilon}_{\text{def'n of } y}))\\
&= \underbrace{(X^TX)^{-1}X^TX\mathbb{E}(\beta) + (X^TX)^{-1}X^T\mathbb{E}(\epsilon)}_{\text{linearity of }\mathbb{E}}\\
&= I\beta + 0\\
&= \beta.
\end{align*}
$$

So \(\hat\beta\) is an *unbiased* estimator for the parameters \(\beta\). 

An estimator for the variance \(\sigma^2\) of \(y\) is

$$
\hat\sigma^2 = \frac{1}{N-p-1}\sum_{i=1}^N(y_i-\hat y)^2.
$$

**Note** The \(N-p-1\) in the denominator is known as *Bessel's correction*. It makes \(\hat\sigma^2\) an unbiased estimator of \(\sigma^2\). 

It's not too hard to show that 

$$
\mathrm{Var}(\hat\beta)=(X^TX)^{-1}\sigma^2
$$

which can be estimated as \((X^TX)^{-1}\hat\sigma^2\). We can use these expressions to form confidence intervals for our parameters. 

For example, to test the hypothesis that a particular coefficient \(\beta_j\) is statistically significantly different from zero, we form the \(Z\)-score 

$$
z=\frac{\hat\beta_j}{\hat\sigma \sqrt{U_j}},
$$

where \(U_j\) is the \(j\)th diagonal entry of the matrix \((X^TX)^{-1}\). Under \(H_0\) (\(\beta_j=0\)), \(\)z_j\sim t_{N-p-1}\(\) which is very close to \(\mathcal{N}(0,1)\) for large \(N-p\). 

## The Gauss-Markov Theorem

TL;DR: Under these assumptions, we can't do any better than the least squares estimator.

More formally: if we assume \(Y=\beta X +\epsilon\), where \(\epsilon\)

- have zero mean 
- have constant, finite variance \(\sigma^2\)
- are uncorrelated (\(\mathrm{Cov}(\epsilon_i,\epsilon_j)=0\) for all \(i,j\))

then the least-squares estimator is the best unbiased linear estimator of the parameters \(\beta\): *best* in this scenario means *lowest variance*. 

### Proof. 

Let \(\tilde\beta\) be another unbiased linear estimator for \(\beta\), say \(\tilde\beta=Cy+m\). 

Then

$$
\beta=\mathbb{E}\tilde\beta=\mathbb{E}(Cy+m)=C\mathbb{E}y + m = C(\mathbb{E}(\beta X + \epsilon))+m = \beta CX + m
$$

and so we must have \(m=0\) and \(CX=I\).

Let's write \(C=(X^TX)^{-1}X^T +G\) for some \(G\), using the formula for a generic left inverse of \(X\). Then 

$$
CX = [(X^TX)^{-1}X^T +G]X = (X^TX)^{-1}(X^TX) + GX = I + GX =I,
$$

so \(GX=0\). The rest is algebra:

$$
\begin{align*}
\mathrm{Var}\tilde\beta &= \mathrm{Var}(Cy)\\	
&= C(\mathrm{Var}y) C^T\\
&= \sigma^2 CC^T\\
&= \sigma^2\Bigl[(X^TX)^{-1}X^T + G\Bigr]\Bigl[X\Bigl((X^TX)^{-1}\Bigr)^T + G^T\Bigr]\\
&= \sigma^2\Bigl[(X^TX)^{-1}X^TX\Bigl((X^TX)^{-1}\Bigr)^T + GX\Bigl((X^TX)^{-1}\Bigr)^T \\
&\qquad+ \;\;(X^TX)^{-1}X^TG^T + GG^T\Bigr]\\
&=\sigma^2\Bigl[\Bigl((X^TX)^{-1}\Bigr)^T + GG^T\Bigr]\\
&= \mathrm{Var}\hat\beta + \sigma^2 GG^T \\
&\geq \mathrm{Var}\hat\beta,
\end{align*}
$$

since \(GG^T\) is positive definite. 

## Next steps

Ways to generalise:

- Introduce non-linearity by considering new variables which are powers \(x_i^2\) or interactions \(x_ix_j\), or even functions (\(\exp(x_j), \sin(x_j)\), etc) of existing features, splines etc
- Relax the assumptions we made about linearity or the errors \(\epsilon\), which leads to generalised linear models
- Reduce the number of features by restricting to the "most important" features
	- Feature subset selection 
	- Regularisation, Shrinkage methods


## Generalised linear models

Our linear regression setup was \(Y=\beta X + \epsilon\). Now let's assume that 

- instead of \(\beta X\), \(Y\) is modelled by some known transformation \(g^{-1}(\beta X)\), called the *link function*
- instead of being normally distributed, the error terms \(\epsilon\) have some arbitrary distribution (from a wide family of distributions known as the *exponential family*). 

This is the setup for a *generalised linear model* (not to be confused with *general linear models*). 

## Logistic regression

Instead of a simple linear model, suppose we want to model the probability that \(y\) has one of two discrete values. 

**Examples**
- \(y\) indicates whether a patient is sick or well, and \(x_1,x_2,x_3\) are continuous measurements from diagnostic equipment or lifestyle factors

Instead of a linearity assumption, we use the *logit* link function 

$$
\mathrm{logit}(p)=\log\Bigl(\frac{p}{1-p}\Bigr).
$$

and assume \(y=\mathrm{logit}^{-1}\Bigl(\beta_0+\sum_{j=1}^p\beta_jx_j\Bigr)\). 

Note that this ensures \(y\) is indeed a probability (between 0 and 1). Of course the results could still
*happen to be wrong*, but they’re not *guaranteed to be wrong* as they would be if we tried to fit an unbounded linear model to predict probabilities.

There is no analytically closed solution to fit logistic regression. We must

- write down the likelihood function \(L(X;\beta)=\prod_{i=1}^N p(x_i;\beta)^{y_i}\Bigl(1-p(x_i;\beta)\Bigr)^{1-y_i}\)
and take its logarithm (log-likelihood)
- differentiate with respect to \(\beta\)
- maximise numerically using Newton–Raphson


### Other examples:

- Poisson regression: Assume that the errors are distributed according to a Poisson distribution instead of normal. 
- Exponential response data


## Shrinkage methods

We saw above a statistical test for whether certain coefficients in a linear regression model are significantly different from zero. What if we could "bake" this process into the model?

When considering removing features from the model, we must manage the tradeoff between 

- **accuracy**: how much of the variance in \(Y\) is explained by the model?
- **interpretability**: how well do we actually understand what is going on in the model?
- **overfitting**: does the model perform well on withheld test sets or just on the training set?

Most intuitive and easiest solution:

- loop over all combinations of \(k\) features for \(k\) between \(1\) and \(p\) (\(p\) combinations of 1 feature, \(p\choose 2\) combinations of 2 features, etc)  (there is an efficient algorithm for this so long as \(p<\sim 40\))
- plot the "best subset curve": find the subset for each \(k\)
- the best-subset curve is necessarily decreasing, so cannot be used to select the subset size \(k\)
- *the question of how to choose k involves the tradeoff between bias and variance, along with the more subjective desire for parsimony*
- e.g.: choose the simplest model (fewest features) within one standard error of the minimum


## Ridge regression

Ridge regression is a method for shrinking coefficients by imposing a penalty on their combined size. 

Instead of the usual linear regression least-squares solution \(\hat\beta_{\mathrm{OLS}}=\mathrm{argmin}_\beta \Bigl\{\sum_{i=1}^N\Bigl(y_i-\sum_{j=0}^p x_{ij}\beta_j\Bigr)^2\Bigr\}\) we instead solve


$$
\begin{align*}
\hat\beta_{\mathrm{ridge}}&=\mathrm{argmin}_\beta \Bigl\{\sum_{i=1}^N\Bigl(y_i-\sum_{j=0}^p x_{ij}\beta_j\Bigr)^2\Bigr\}\\
&\mathrm{subject \;to}\;\; \sum_{j=1}^p \beta_j^2\leq t.
\end{align*}
$$

## The LASSO

Another option is the LASSO (Least Absolute Shrinkage and Selection Operator), which solves the optimisation problem

$$
\begin{align*}
\hat\beta_{\mathrm{ridge}}&=\mathrm{argmin}_\beta \Bigl\{\sum_{i=1}^N\Bigl(y_i-\sum_{j=0}^p x_{ij}\beta_j\Bigr)^2\Bigr\}\\
&\mathrm{subject \;to}\;\; \sum_{j=1}^p \left|\beta_j\right|\leq t.
\end{align*}
$$

In turns out that ridge regression and the LASSO behave similarly, but the LASSO is often preferable as it has a nice geometric property which allows some coefficients to be actually set to exactly zero. 

Why do we need to do this?

## Principal component analysis

PCA is another way to deal with intercorrelated features. The idea is to replace the initial feature list with linear combinations of features which explain the highest possible amounts of variance. 

We start with the singular value decomposition of the training matrix \(X=UDV^T\), where \(U,V\) are orthogonal matrices and \(D\) is diagonal. This is a process we can perform on any matrix (doesn't have to be square) which generalises the eigendecomposition of positive semidefinite normal matrices.

We reorder the columns of \(U\) and \(V\) so that the diagonal entries \(d_1,\ldots,d_p\) of \(D\) are in increasing order \(d_1\geq d_2\geq \cdots \geq d_p\).

The columns of \(U\) (\(N\times p\)) span the column space of \(X\). These are orthogonal matrices, so \(U^TU=I\), \(VV^T=V^TV=I\). 

For a given \(y\), it's easy to show that the least squares estimator can be written as 

$$
X\hat\beta_{\mathrm{OLS}} = UU^Ty
$$

and similarly that the ridge regression estimator can be written as

$$
\begin{align*}
X\hat\beta_{\mathrm{ridge}} &= UD(D^2+\lambda I)DU^Ty\\
&= \sum_{i=1}^p u_j\frac{d_j^2}{d_j^2+\lambda}u_j^T y.
\end{align*}
$$

This shows that ridge regression

- computes the coordinates of \(y\) with respect to the orthonormal basis \(U\) (just like OLS regression)
- shrinks these coordinates by factors \(\frac{d_j^2}{d_j^2+\lambda}\)

The largest \(d_j^2\) (namely \(d_1^2\)) has the least amount of shrinkage, and the smallest \(d_j^2\) (namely \(d_p^2\)) has the most. 

It can be shown that the eigendecomposition of the sample variance/covariance matrix \(\frac{1}{N}X^TX\) is \(VD^2V^T\) and its eigenvectors \(v_j\), the columns of \(V\), are called the principal components of \(X\). 

The first principal component \(v_1\) has the property that \(z_1=Xv_1\) has the largest sample variance among all linear combinations of the columns of \(X\): its sample variance is 

$$
\mathrm{Var}(z_1)=\mathrm{Var}(Xv_i)=\frac{d_1^2}{N}.
$$

## Support vector machines for regression

A *support vector machine* is a model for performing classification. To simplify notation, we describe the problem in one-dimension.

Suppose we have some boolean response variable \(Y\) and a single feature \(x\). We want to fit a function \(f(x)=w x + b\) with the property that 

- all examples from the training dataset are classified correctly: one class is entirely on one side of the line and the other class entirely on the other 
- \(w\) is the minimal slope with this property 


### Generalisations:

- if the data are not separable, we can introduce slack variables which allow for misclassification
- use the "kernel trick" to embed data in higher dimensional / transformed spaces where it may be separable

To use SVMs for regression, we replace the constraint that "all examples from the training dataset are classified correctly" with the constraint that "all responses are within some fixed \(\epsilon\) of their true response from the training dataset."
