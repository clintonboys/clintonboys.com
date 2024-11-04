---
layout: post
title: The Bias-Variance tradeoff
date: 2018-05-28T21:21:46-05:00
lastmod: 2018-05-28T21:21:46-05:00

categories:
  - Statistics
  - Machine learning

feature_image: sample-image-28.jpg
feature_image_alt: Berlin, Germany, 2012
---

# The Bias-Variance tradeoff

*January 15, 2017*

The Bias-Variance tradeoff is an extremely important concept in statistical modelling which is often misinterpreted or poorly understood. In this post I'll give a gentle introduction to the idea, followed by a deeper and more general discussion from a mathematical perspective. 

We are going to be discussing the general framework of using a statistical model to make predictions. We will have a training set of input data and correct responses, and use this to build a model that allows us to predict the response variable $Y$ for new input $X$ (in machine learning this is known as *supervised learning*).

Formally, let our model be represented by a function

$$
\begin{align}
f:\mathbb{R}^p&\to\mathbb{R}\nonumber\\
X&\mapsto f(X)\nonumber
\end{align}
$$

\(f\) can represent many different examples. If our expected output \(Y\) is continuous, this is the setup for *regression*, and if \(Y\) takes discrete (or categorical) values, this is the setup for *classification*. 

In order to know how well our model is doing, we need a way to measure its error. In statistical decision theory, this is known as a *loss function*

$$
\begin{align}
L:\mathbb{R}\times\mathbb{R}&\to \mathbb{R}\nonumber\\
(Y,f(X))&\mapsto L(Y,f(X)).\nonumber
\end{align}
$$

There are many different possible choices of loss functions, but the most commonly used in machine learning is the squared error \(L(Y,f(X)) = (Y-f(X))^2\) (the most obvious choice, \(L(Y,f(X)) = \mid Y-f(X)\mid \) is also widely used). 

In theory, deciding on our model is now easy, or at least, the problem is precisely formulated. We need to choose the function \(f\) which minimises the expected loss, i.e. minimises \(\mathbb{E}(Y-f(X))^2\). 

Some manipulation (see here or here) shows that there is a simple solution to this problem: the function which minimises the expected squared loss is given by

$$
\begin{equation}
f(X) = \mathbb{E}(Y\mid X),\nonumber
\end{equation}
$$

known as the *conditional expectation* or *regression function*. This is a mathematical formulation of a fairly intuitive idea: the best prediction of $Y$ at the point $X=x$ is the conditional mean. 

The question relevant to choosing a statistical model is therefore not "how do I choose a model to minimise the loss function" but rather "what practical implementation do I use to estimate the conditional expectation?"

For a mathematician, one of the most obvious solutions is to approximate the value of $f$ by enlarging our scope to a *neighbourhood* of $x$ and computing the mean. More precisely, at a point $x$ we want 

$$
\begin{equation}
\hat f(x) = \frac{1}{k}\sum_{x_i\in N_k(x)}y_i\nonumber
\end{equation}
$$

where \(N_k(x)\) is a neighbourhood containing the \(k\) closest points to \(x\). This approach is known as \(k\)-*nearest neighbours*. 

Another obvious solution is to assume that the regression function \(f(x)\) can be approximated by a linear function \(\hat f(x) = \beta\cdot x\). This linear equation can be solved easily and leads to the familiar linear regression equations. 

Can we say more about our error in general? Note that 

$$
\begin{equation}
\mathbb{E}(Y-f(X))^2 = \mathbb{E}(Y-\mathbb{E}(Y))^2 + (\mathbb{E}(Y) - f(X))^2.\nonumber
\end{equation}
$$

Statisticians will immediately recognise these two terms as the *variance* \(\mathrm{Var}(Y) = \mathbb{E}(Y-\mathbb{E}(Y))^2\) and the *bias squared* \(\mathrm{Bias}^2(Y) = (\mathbb{E}(Y) - f(X))^2.\)

The bias is the average of the difference between the true values of the predictions and the predicted values. It is an estimate of the amount by which our model is "missing" the true relationship between \(X\) and \(Y\). The variance gives is a measure of how sensitive the model is to changes in the input data's distribution. 

Since everything is positive, and since errors are unavoidable, we can expect both of these terms to be present no matter which model we choose. But surely not all models are equal in the amount of variance and bias they introduce. Can we minimise one, and must it always come at the cost of the other? Is it possible to minimise both simultaneously? 

The fact is that it is difficult to find models with simultaneously low variance and bias and this is known as the *bias-variance tradeoff*. 

In regression, we make assumptions about the data being linear which has the potential to greatly increase the inherent bias (by ignoring the possibility of non-linear true relationships in the data). The model is however fairly rigid and has a low variance.

In $k$-nearest neighbours, for small $k$, the model is highly flexible and provides very little bias. However as \(k\) grows larger, for technical reasons the bias increases much faster than the variance and the error can become quite large. 










