---
layout: post
title: Encrypting files in emacs org-mode
date: 2020-07-18T21:21:46-05:00
lastmod: 2020-07-18T21:21:46-05:00

categories:
  - emacs

feature_image: sample-image-73.jpg
feature_image_alt: Fagurholsmyri, Iceland, 2018
---

# Encrypting files in emacs org-mode

*July 18, 2020*


People who use org-mode in emacs for sensitive things like keeping a private journal, or recording their unprocessed thoughts on all manner of subjects, have reason to want their files securely encrypted, particularly if they use a cloud syncing service, like Dropbox or iCloud, which is [not](https://www.howtogeek.com/166507/why-most-web-services-dont-use-end-to-end-encryption/) [end](https://www.dropboxforum.com/t5/Dropbox-files-folders/end-to-end-encryption/td-p/325994)-[to](https://9to5mac.com/2020/01/21/apple-reportedly-abandoned-end-to-end-icloud/)-[end](https://support.apple.com/en-us/HT202303) [encrypted](https://www.preveil.com/blog/cloud-services-vulnerable-without-end-end-encryption/).

This is usually accomplished in emacs using [GPG](https://en.wikipedia.org/wiki/GNU_Privacy_Guard), free software that allows a user to generate asymmetric key pairs which they can use to encrypt and decrypt files (and send and receive encrypted messages). I won't go into the mathematics behind how public-key cryptography works, and it really isn't important for this use case, as you can wrap the private key with a short password, which you can enter whenever you want to decrypt a message or file. 

In order to work seamlessly, encryption in emacs should work as follows: 

- desired files (not every file, this should be configurable) should be encrypted when created or saved
- the encrypted file is then saved to disk (and synced to the cloud if desired)
- when the encrypted file is opened, the user is prompted to enter the passphrase for their private key (the prompt can only appear once a session, or on machine restart, or every time, depending on the user's needs)

This is all relatively easy to accomplish in emacs using GPG and the EasyPG package. Worth mentioning this is all on macOS 10.15.2 Catalina with GNU Emacs 26.2.

## Setting up GPG

You'll need to download GnuPG; on macOS if you have [brew](https://www.google.com/search?hl=en&q=brew) installed you can just 
```
brew install gnupg21
```
Once the install has finished you can set up your key with
```
gpg --full-generate-key
```
and follow the prompts to create a asymmetric key pair. 

- You'll want to select `(1) RSA and RSA (default)` as the type of key you want; this is just to signify you want to generate a standard RSA private key, and also a corresponding public key. 
- You need to choose the size of your key in bits (higher is better in terms of security and since you're never going to interact with the key you may as well go with that).
- You can set an expiry time for your private key; unless you know what you're doing I wouldn't suggest trying to do this. 
- You'll also need to enter your name and email (GPG makes a point of saying "your real name", I think this is more because of how public keyservers are widely used in Germany, obviously there's no need to use your real name unless you want people to be able to find your public key when they search for you in public keyservers). 
- And finally you'll need to enter a password that protects your private key. **If you lose this password you will be unable to decrypt any of your encrypted files. There's no "forgot my password" feature. Unless you discover a way to crack RSA encryption, your encrypted files are lost forever if you lose your password.**

It's also important to point out that you need to keep the actual private key file, which GnuPG stores by default in `~/.gnupg` in order to decrypt (not just the password). So if you lose the computer with the key on it, you lose the key. 

## Configuring emacs

I added the following to my emacs `init.el` file, where `MY_EMAIL_ADDRESS` is the email address I entered when I configured the key above. 

{{< highlight elisp >}}
(use-package epa-file
    :ensure nil 
    :config
    (setq epa-file-encrypt-to '("MY_EMAIL_ADDRESS"))
    :custom
    (epa-file-select-keys 'silent))

(use-package org-crypt
  :ensure nil  ;; included with org-mode
  :after org
  :config
  (org-crypt-use-before-save-magic)
  (setq org-tags-exclude-from-inheritance (quote ("crypt")))
  :custom
  (org-crypt-key "MY_EMAIL_ADDRESS"))
{{< /highlight >}}

With this setup, you will be prompted for your password every time you need to decrypt a file with the .org.gpg extension (i.e. whenever you open such a file). Configuring GPG to cache your password is a little more complicated (and not hugely user-friendly); if you're interested you can refer to [this](https://superuser.com/questions/624343/keep-gnupg-credentials-cached-for-entire-user-session) StackOverflow post. 

## A certain uneasiness

I'll admit I struggle with the idea of encrypting my files in such a "hardcore" way. There's something about the "reset my password" capabilities of cloud services, which necessarily mean your files can potentially be viewed by someone else, that give me peace of mind. The thought that if catastrophe strikes and I forget my password I can still have access to my files outweights or is at least competitive with my concerns for privacy. 

This uneasiness, which I think is a fairly normal human reaction to the fear of losing access to precious files that represent and crystallise thoughts, is probably the reason that companies like Apple don't give hardcore security enthusiasts the end-to-end file encryption service they "think they want". 

Another weak point for me is that in order to feel confident that my private key file is backed up, I probably want to sync this to a cloud provider, which means that the theoretical person who can read my files on Dropbox can also open my private key and use it to decrypt my files. The only real solution to this is physical backups, which are obviously vulnerable to theft and natural disaster. Like most things in the realm of digital security, it's a rabbit-hole that's hard to get out of once you go in. 

So at the moment I'm fairly selective about which files I decide to encrypt. Whenever I create a new .org file I ask myself: would I be OK if someone else, somewhere, somehow, ended up reading this? If the answer is yes (even a begrudging yes), I will skip encryption. If it's no, and it tends to be no more for personal journal entries and the like, I will encrypt. 
