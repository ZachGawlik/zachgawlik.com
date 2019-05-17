---
title: 'Taming Your Frontend Codebase with Ripgrep'
date: '2019-05-17'
description: ''
---

I had the mistaken impression that using the command-line beyond the basics of navigating folders, running tests, and using git was something reserved for backend or DevOps developers. Once I tasked myself with modernizing a large-scale React codebase, I found that learning a few CLI tools and pairing them with Unix commands opened up new possibilities for my work.

Command-line tools shine for tasks that involve searching or manipulating a wide span of the codebase. You might be curious about all the different usages of a method, but you wouldn't want to click into each of the 100 found results in a code editor to find out. If the only other option to get this information required creating a file to write a bespoke script, the inertia is enough to make you abandon the passing curiosity. Learning ripgrep and other CLI tools enables you to quickly draw up powerful ad-hoc scripts at the terminal to immediately get these answers.

This post will focus solely on discovering patterns within your codebase. A follow-up post will pair this with file manipulation commands to pull off large-scale targeted refactors. As a prerequisite, the tools I'll cover rely heavily on regular expressions. I personally find [RegexOne](https://regexone.com) to be useful for learning the basics and [Regex101](https://regex101.com) for refreshing my knowledge.

The examples are working on the codebases of the open-source React web applications [Spectrum](https://github.com/withspectrum/spectrum) and [Devhub](https://github.com/devhubapp/devhub).

## Ripgrep (rg)

Ripgrep acts as a "find all" tool for regular expression matches within the contents of a folder. More information is available at its [repository](https://github.com/BurntSushi/ripgrep). For Homebrew users, installation is as simple as `brew install ripgrep`.

### Is this thing used?

Answering questions like "does this optional prop ever get supplied?" or "is the prop only ever one of these known values?" can lead to simplifying logic by eliminating unused code paths no longer relevant to a codebase that has evolved over the course of years. Without a quick way to check, these options frequently get left in the codebase "just in case".

Searching for the prop's name directly may yield results for too many other components for generic prop names like `onClick`, `type`, or `theme`. Using "Find All" for the component name in a code editor could also return 100+ results that you'd have to click through to see each match.

Instead, we can search with ripgrep to print out all usages. Running `rg <Avatar` will find the first lines using the component but doesn't surface any of the props if they're on new lines. To do this, we can be a bit clever with regex to match the JSX element itself:

```
rg '<Avatar[^/]*/>' --multiline
```

This lists all usages at once, and is already an improvement from searching through a code editor, but we can go further by feeding this output back into ripgrep to search for the prop in question. To surface every usage of the prop `size` for the `<Avatar />` component:

```
rg '<Avatar[^/]*/>' --multiline --no-filename --no-line-number | rg 'size'
```

<video
    controls="true"
    crossOrigin="anonymous"
    src="avatar-usages.mp4"
    type="video/mp4"
    width="100%"
    loop
/>

If no results return, then the optional prop can be removed from the component (though you'll also want to check for any `{...props}` spreads). If there are relatively few values, it could be a candidate for strictly typing as an enum of a few options and code branches for specific other values could be deleted.

### How often are these different options used?

Ripgrep is also useful for understanding relative usage of similar methods and files.

For example, if you're trying to tame down dependency bloat, you might want to know which specific methods of a library are used and whether those methods are frequently or rarely used. The following command shows how to do so for lodash:

```
rg '_\.(\w*)\(' -o --no-filename | sort | uniq -c | sort -r

  10 _.uniq(
   9 _.max(
   7 _.pick(
   6 _.isPlainObject(
   6 _.isEqual(
     ...
```

The key here is using regex capture groups and the `--only-matching` (`-o`) option. Incrementally adding on each option and pipe can help show what each piece of the command contributes:

<video
    controls="true"
    crossOrigin="anonymous"
    src="underscore-counts.mp4"
    type="video/mp4"
    width="100%"
    loop
/>

This technique can be adapted for other use-cases. If there are many different button components, you can get usage stats to find which buttons are widely used and which are one-offs:

```
rg '<(\w*)Button' --no-filename --no-line-number -o | sort | uniq -c | sort -r
  45 <OutlineButton
  27 <Button
  26 <PrimaryOutlineButton
     ...
   1 <FacebookSigninButton
   1 <ContinueButton
```

If the above were for code in a design system, this could point towards which styles are primary button styles and which fringe variations might be worth removing for consistency.

Similarly, if your codebase has an internal library for code reuse or has folders like "common" or "shared", you can use ripgrep to search all import statements to ensure those files really are widely used:

```
rg 'common/(.*)' -o --no-filename --no-line-number | sort | uniq -c | sort
   1 common/FreeTrialHeaderMessage'
   1 common/FullHeightScrollView'
     ...
  17 common/Avatar'
  21 common/Link'
  29 common/Spacer'
```

The files with only 1 usage could be candidates for inlining, while the lower usage counts could be candidates for colocating with the code that uses them.

## In closing

Ripgrep has been my most crucial tool for understanding a codebase's breadth so that I could confidently delete code, limit unused options, and perform wide-reaching refactors. I've also found it help for monitoring the codebase over time, surfacing insights on "Are we actively using this library or is it only in historical code?" or "Are there new files being added without Flow type checking?" or "We said this was our new best practice, but are we following through with it?".

If this post sparked interest, ask yourself a question about your codebase and find the answer using ripgrep. I promise the results will be more interesting when it's about code you work with daily! They don’t have to be revolutionary insights to begin with, and over time you can tackle more difficult problems by gradually incorporating new flag options or chaining searches with pipes. Answering "How many files are components” gets you familiar using the tool and can eventually lead to questions like "How many components use prop-types vs Flow/TypeScript vs no type checking at all?" Another exercise could be "What rules are most frequently overridden with an eslint-ignore comment?".

Learning about your codebase in a whole new way can be pretty immediately rewarding, so go on and have fun with it!
