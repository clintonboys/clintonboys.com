---
layout: post
title: Building iOS apps with React Native
date: 2023-02-10T21:21:46-05:00
lastmod: 2023-02-10T21:21:46-05:00

categories:
  - React
  - Mobile
  - Software development

feature_image: sample-image-66.jpg
feature_image_alt: Entrevaux, France, 2022
---

# Building iOS apps with React Native

*February 10, 2023*

Until quite recently I hadn't got around to building a mobile app, but I had a vague idea about the "native" vs "web" debate. In iOS, "native" means the application was built using Swift and UIKit, Apple's APIs and programming language that are deeply linked to the operating system and provide a unified interface across applications, as well as many performance benefits. On Android, which I don't understand quite as well, it seems like Java or Kotlin are usually required to properly write "native" Android apps. Most large software companies will have two separate teams for iOS and Android, and build two separate apps with the different native toolkits. 

On the other end of the spectrum, there are several solutions that allow you to develop from a single code base, and then create builds for both mobile architectures. Usually this involves building a web application, and then compiling it to the native languages, and usually there are some sacrifices: older APIs for compatibility, performance, binary size, etc. The fact that most large companies still have two teams, and are willing to absorb the overhead and cost associated with that, suggest that these sacrifices are usually a little too much if you want truly high quality apps in both ecosystems. 

React Native is another step in this direction: it lets you write a [React]({{ site.baseurl }}{% link _posts/2022-08-18-react.md %}) web application and then transpile it to native binaries. Combined with some automatic build systems like [Expo](https://expo.dev), and of course a subscription to the [Apple Developer Program](https://developer.apple.com), paid for with a grimace, I found React Native gives a very fast and simple way to write, build and deploy apps for iOS - of course, the experience is particularly good if you happen to already know React. I didn't try Android because I don't have a device, but I think the additional effort would have been minimal (but still not [free](https://support.google.com/googleplay/android-developer/thread/238604449/how-do-i-create-a-game-and-upload-it-to-the-app-store?hl=en#:~:text=If%20you%20don't%20already,Prepare%20your%20game%20for%20submission)).

Indeed, with the following toolkit:

- react-native
- npx
- expo

You can create and submit an app to the App store in just five commands:

    npx create-expo-app your-app
    cd your-app
    expo start
    eas build
    eas submit --platform ios

