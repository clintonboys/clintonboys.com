---
layout: post
title: Deriving Kepler's laws from Newton's laws
date: 2020-09-01T21:21:46-05:00
lastmod: 2020-09-01T21:21:46-05:00

categories:
  - Mathematics
  - Physics

feature_image: sample-image-70.jpg
feature_image_alt: Gordon Beach, Tel Aviv, Israel, 2020
---

# Deriving Kepler's laws from Newton's laws

*September 1, 2020*

I've always been interested in physics but somehow, despite my years of studying mathematics, I'd never really properly studied physics outside of a couple of very introductory courses in my undergraduate days. So recently I've been going through some of the things I'd missed or forgotten, some important and beautiful results from a bunch of different areas of physics. 

In this post I wanted to outline from a mathematical perspective the derivation of Kepler's laws of planetary motion from Newton's laws of motion. I love this derivation because I can feel the palpable sense of wonder that Newton must have felt while he was going through this very calculation more than three hundred years ago. 

[Kepler's laws of planetary motion](https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion) were derived from painstakingly precise observations of the solar system. They conjecture a very simple and beautiful model for the movement of the planets around the sun:

- planets orbit the sun following an elliptical path with the sun at one focus (Kepler's first law);
- the line joining each planet and the sun "sweeps out" equal areas during equal intervals of time (so a planet travels faster when it's closer to the sun and slower when it's further away; Kepler's second law);
- the ratio of the square of a planet's orbital period and the cube of its semi-major axis is constant (Kepler's third law). 

These laws are extremely accurate in predicting the motion of planets in our solar system, and gave elegant explanations for many phenomena, but for many years the *reason why* they hold remained a mystery. It took the genius of Isaac Newton to *derive* Kepler's laws from the simpler, more axiomatic laws of motion that formed the centrepiece of his *Principia Mathematicae*. These days, it's a fundamental piece of an undergraduate physics education, and a nice exercise in vector arithmetic and thinking mechanically.  

## Centre-of-mass coordinates

The first insight is that we can treat a "two-body problem", like finding the orbital loci of the Sun and the Earth, as a one-body problem where the *reduced mass* \(\mu\) moves about a fixed *centre of mass* \(M\). Explicitly, let's write \(m_1\) and \(m_2\) for our two masses (you can think of \(m_1\) as representing the Earth and \(m_2\) the Sun); then 

$$
\mu = \frac{m_1m_2}{m_1+m_2};\quad \quad M=m_1+m_2.
$$

## Angular momentum

Momentum is a pretty intuitive concept: the momentum of an object is equal to its mass times its velocity. Similarly, the *angular* momentum of an object is equal to its mass times its *angular velocity*, the vector representing the rate at which the object's angular position is changing with respect to its centre of mass (strictly speaking we're discussing *orbital angular velocity*; there is also *spin angular velocity* which measures how fast an object itself rotates). 

It's a general fact that the angular momentum \(\mathbf{L}\) of an object in three dimensions is equal to the [cross product](https://en.wikipedia.org/wiki/Cross_product) \(\mathbf{r}\times\mathbf{p}\) of its position vector \(\mathbf{r}\) and its positional momentum $$\mathbf{p} = m\mathbf{v}.$$

## Kepler's first law

We want to consider the effect of the gravitational force of \(M\) on \(\mu\)'s angular momentum. Let's suppose this is the only force acting on \(\mu\), and try to find an expression for the rate of change of angular momentum. Using the product rule on the definition of \(\mathbf{L}\), 

$$
\frac{d\mathbf{L}}{dt} = \frac{d\mathbf{r}}{dt}\times\mathbf{p} + \mathbf{r}\times\frac{d\mathbf{p}}{dt} = \mathbf{v}\times \mathbf{p}+\mathbf{r}\times \mathbf{F},
$$

where $$\mathbf{F}=\mu\mathbf{a} = \mu\frac{d\mathbf{v}}{dt} = \frac{d\mathbf{p}}{dt}$$ by [Newton's second law](https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion#Newton's_second_law). 

Note that both of the terms on the right-hand-side are zero: $$\mathbf{v}\times \mathbf{p} = \mu \mathbf{v}\times \mathbf{v} = 0,$$ since the cross-product of parallel vectors is zero, and since \(\mathbf{F}\) is a central force directed inwards along \(\mathbf{r}\), the second term is zero for the same reason. This means \(\frac{d\mathbf{L}}{dt}=0\), so the angular momentum is constant. Let's try to compute it explicitly. We write \(\mathbf{r}=r\mathbf{r}'\), where \(\mathbf{r}'\) is the unit vector pointing in \(\mathbf{r}\)'s direction. 

$$
\begin{align*}
\mathbf{L} &= \mathbf{r}\times\mathbf{p}\\
&= \mu\mathbf{r}\times \mathbf{v}\\
&= r\mu\mathbf{r}'\times \frac{d}{dt}(r\mathbf{r}')\\
&= \mu r \mathbf{r}' \times \Bigl(\frac{dr}{dt}\mathbf{r}' + r\frac{d}{dt}\mathbf{r}'\Bigr)\\
&= \mu r^2\mathbf{r}' \times \frac{d}{dt}\mathbf{r}'.
\end{align*}
$$

where we have again used the fact that \(\mathbf{r}'\times \mathbf{r}'=0\). 

It's a general fact from Newtonian mechanics about "central forces" like the gravitational force that the acceleration due to the force is directed radially inwards and is proportional to the inverse square of the distance from the center. For gravity we can use the *universal gravitational constant* \(G\) to write this acceleration explicitly as 

$$
\mathbf{a}=-\frac{GM}{r^2}\mathbf{r}'.
$$

The next part is a bit of a trick: we are going to take the cross product of \(\mathbf{a}\) with \(\mathbf{L}\), just to see what happens. 

$$
\begin{align*}
\mathbf{a}\times\mathbf{L} &= \Bigr(-\frac{GM}{r^2}\mathbf{r}'\Bigr)\times \Bigl(\mu r^2\mathbf{r}' \times \frac{d}{dt}\mathbf{r}'\Bigr)\\
&= -GM\mu \mathbf{r}'\times \Bigl(\mathbf{r}'\times \frac{d}{dt}\mathbf{r}'\Bigr)\\
&= -GM\mu\Bigl[\Bigl(\mathbf{r}'\cdot \frac{d}{dt}\mathbf{r}'\Bigr)\mathbf{r}'-(\mathbf{r}'\cdot\mathbf{r}')\frac{d}{dt}\mathbf{r}'\Bigr]
\end{align*}
$$

using a common [vector identity](https://en.wikipedia.org/wiki/Triple_product#Vector_triple_product). Now since \(\mathbf{r}'\) is a unit vector, \(\mathbf{r}'\cdot\mathbf{r}'=1\), and since 

$$
\mathbf{r}'\cdot \frac{d}{dt}\mathbf{r}' = \frac12\frac{d}{dt}(\mathbf{r}'\cdot\mathbf{r}') = 0
$$

the expression above simplifies to 

$$
\mathbf{a}\times\mathbf{L} = GM\mu\frac{d}{dt}\mathbf{r}'.
$$

Finally, notice that we can write 

$$\frac{d}{dt}(\mathbf{v}\times \mathbf{L}) = \frac{d}{dt}\mathbf{v}\times \mathbf{L}+\mathbf{v}\times \frac{d}{dt}\mathbf{L}=\mathbf{a}\times \mathbf{L}$$ 

since we showed above that \(\frac{d}{dt}\mathbf{L}=0\). We combining these expressions we see that 

$$
\frac{d}{dt}(\mathbf{v}\times \mathbf{L}) = \frac{d}{dt}(GM\mu\mathbf{r}')
$$

and integrating with respect to time gives

$$
\mathbf{v}\times \mathbf{L} = GM\mu\mathbf{r}' + \mathbf{C}
$$

for some constant vector \(\mathbf{C}\). Let's take the dot product of this with \(\mathbf{r}\) so we can use the vector identity we used above again:

$$
\mathbf{r}\cdot(\mathbf{v}\times \mathbf{L}) = GM\mu r\mathbf{r}'\cdot \mathbf{r}' + \mathbf{r}\cdot \mathbf{C}
$$

and we can rearrange the left-hand side using the vector identity and simplify the right-hand side, assuming that \(\theta\) is the angle between \(\mathbf{r}\) and \(\mathbf{C}\) to give 

$$
(\mathbf{r}\times\mathbf{v})\cdot \mathbf{L} = GM\mu r + r C\cos\theta. 
$$

But by definition of angular momentum, \(\mathbf{L}=\mu\mathbf{r}\times \mathbf{v}\). Writing \(L=\left\|\mathbf{L}\right\|\)  the left-hand side is equal to \(\frac{L^2}\mu\) and so we have the scalar equation

$$
\frac{L^2}{\mu} = GM\mu r\Bigl(1 + \frac{C\cos\theta}{GM\mu}\Bigr)
$$

which, if we rearrange to make \(r\) the subject and write \(e=D/GM\mu\) gives

$$
r = \frac{L^2/\mu^2}{GM(1+e\cos\theta)}
$$

which is precisely the equation of an ellipse in spherical coordinates, where \(e\) is the eccentricity of the ellipse. So this is Kepler's first law!

## Kepler's second law

Let's think about the infinitesimal change in area swept out by an infinitesimal change in angle \(\theta\); a standard polar coordinates diagram should convince you that \(dA=\frac12r^2d\theta\), so

$$
\frac{dA}{dt}=\frac12r^2\frac{d\theta}{dt}.
$$

Notice that we can decompose the orbital velocity vector \(\mathbf{v}\) into radial and angular components:

$$
\mathbf{v}=\frac{dr}{dt}\mathbf{r}' + \frac{d\theta}{dt}\mathbf{\theta}'
$$

If we write $$\mathbf{v}=\mathbf{v}_r + \mathbf{v}_{\theta}=v_r\mathbf{r}' + v_{\theta}\mathbf{\theta}'$$ for the explicit decomposition of \(\mathbf{v}\) then we can combine the two equations above as 

$$
\frac{dA}{dt}=\frac12 rv_{\theta}.
$$

Now 

$$
\left|\mathbf{r}\times \mathbf{v}\right|=\left|v_r\mathbf{r}\times \mathbf{r}' +rv_{\theta}\mathbf{r}'\times v_{\theta}'\right|=rv_{\theta}
$$

and as we have seen above the left-hand side is equal to 

$$
\left|\frac{\mathbf{L}}{\mu}\right|=\frac{L}\mu
$$ 

and so we see 

$$
\frac{dA}{dt}=\frac12\frac{L}\mu,
$$

which is independent of \(t\), proving Kepler's second law. 

## Kepler's third law

If we integrate the above expression over one orbital period, i.e. from \(0\) to \(P\) we get the total area of the ellipse as 

$$
A = \int_0^P\frac12\frac{L}\mu dt = \frac12\frac{L}\mu P.
$$

Writing \(a\) and \(b\) for the semimajor and semiminor axes of the ellipse, the formula for the area of an ellipse is $$A=\pi ab$$ and so if we substitute this for the left-hand side we see 

$$
P = \frac{2\pi ab\mu}{L}.
$$

Now, the eccentricity \(e\) of an ellipse gives a relationship between the semimajor and semiminor axes as \(b^2=a^2(1-e^2)\), and substituting this and the expression for \(L\) in terms of \(\mu\) and \(e\) that we obtained from the first law, we can rearrange the equation above to give

$$
P^2=\frac{4\pi^2}{G\mu}a^3.
$$

This is the statement of Kepler's third law, but crucially we actually have an expression for the coefficient in the famous power-law relationship. 
