---
layout: post
title: Multilevel regression
image:
  feature: sample-image-72.jpg
  credit: Hong Kong, 2019
---

This post is about what people usually mean when they use the term "heirarchical regression", which is one of those confusing terms in statistics that can have different meanings to different people. I've noticed people using "heirarchical regression" to refer to two things:

- what *statisticians* call heirarchical regression: a way to sequentially include new explanatory variables in a model to determine whether they show a significant improvement in the model's ability to explain variance in the dependent variable;
- what statisticians call multilevel models, a way of performing regressions on several nested "levels" in a cohesive and well-defined way. 

The second meaning above, [multilevel models](https://en.wikipedia.org/wiki/Multilevel_model), is usually what people are referring to when they use the term, and because it's by far the more interesting and commonly used method, I wanted to give a brief explanation of how it works and why it's useful. 

First off, it's worth mentioning the classic textbook example that is usually given: imagine the problem of modelling standardised test score performance in children across different schools in a large region, like a country. Presumably there are vast difference in mean test performance between schools, based on large-scale factors like location, income, and so on, so the performance of a "talented" student needs to be corrected for this "school-level" effect before being compared to students in different schools. This intuitive example captures the essence of multilevel models, which give this idea a mathematical formalism and the precision of statistical language.

Let's use a slightly different example, closely following [this](https://www.researchgate.net/profile/Carl_Van_Walraven/publication/11999297_An_Introduction_to_Multilevel_Regression_Models/links/5512c73a0cf268a4aaeb0e3a/An-Introduction-to-Multilevel-Regression-Models.pdf) very nice guide. Suppose we are studying the cost of a certain medical treatment and have data on one thousand patients who were treated by one hundred different doctors. Let's suppose we are looking only at one feature: the age of the patient. In a normal linear regression model, we would find an intercept $$\beta_0$$ and coefficient $$\beta_1$$ and model cost of treatment $$y$$ by

$$
y = \beta_0 + \beta_1 x
$$

where $$x$$ is the patient's age, bearing in mind that the least squares method of estimating these coefficient also allows us to give a measure of our *confidence* in our esimates. 

Of course, a fundamental assumption when applying the usual least-squares fit is that the samples are all independent, and the fact that patients can be grouped by the doctor they were treated by makes this assumption invalid: certain doctors may be more effective than others and manage to treat patients for less on average, and other doctors may have known specialisations which attract particularly difficult patients whose cost of treatment is inherently higher. 

Alongside this lack of independence between the "pools" of patients by doctor, the *effect* of age on cost of treatment, that is, the $$\beta_1$$ coefficient above which represents the gradient of the fit line, can also be different for different doctors: some doctors may be more effective at keeping treatment costs low for all age groups. 

Multilevel regression models provide a methodology for handling both of these subtle generalisations of the usual regression setup, as well as allowing for the introduction of other features which may be associated with a specific level only: for example alongside the patient-level age feature, we may wish to add features on the doctor level, for example binary features encoding the types of specialisations the doctor has, or his or her years of experience, and so on.

In a future post I'd like to discuss a relatively new method, called multilevel regression and poststratification, which is being used to build robust models of large heterogenous populations from small-sample polls, for example for modelling elections. 
