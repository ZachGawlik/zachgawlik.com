---
title: 'Setting up a macOS Dev Machine'
date: '2017-07-12'
description: ''
---

Due to Northeastern University's co-op program where I worked somewhere new every year, I became accustomed to having to frequently set up a new laptop for development work. Now in an effort to prolong the life of my personal laptop I've started to fresh install my OS regularly to rid it of accumulated clutter. Having to set up a fresh install so often, I've become familiar with the order and approaches to doing this quickly and painlessly.

I find that having a checklist of important files helps ease my concerns with wiping my personal laptop and that having listed steps complete with the key terminal commands helps speed up the whole process, so I hope this can be useful for others too.

## Preparing for the move

If you're reformatting your personal laptop, it's common sense to back up your documents, songs, and movies, but as developers there are a lot of hidden bits of essential information on your computer. Even if you transferred all of the stored files, your fresh install might feel like a stranger's computer without your familiar settings.

For example, I make sure to copy my `.zshrc` (or `.bash_profile`) to carry over my familiar terminal aliases, my `.vimrc` for my vim configurations, and my `.gitconfig` for my command abbreviations that have become reflex for me.

More than that, some everyday apps needed to be fine-tuned before they could be useful. Make sure to export your code editor's settings (I recommend `sync-settings` if you use Atom), export your iTerm2 profile complete with color settings, export your BetterTouchTool settings, and make a list of your Alfred workflows. If you're worried you'll forget some application you use, you can run `ls /Applications > app-list.txt` to save a text file list of all of your installed apps. Similarly you can run `` ls `npm root -g` > npm-global-list.txt `` to save a list of your global npm packages.

If I'm wiping my laptop, I also save a screenshot of my dock layout because any other ordering doesn't feel quite right to me.

## Fixing macOS default settings

Now on a fresh install you'll get a feel of how much you've slowly customized your settings over time. In my case I immediately go through system preferences to enable tap to click, fix the screen resolution for more usable space, up the key repeat and minimize delay, set the Caps Lock button to Control, remove most of the standard shortcuts in the Keyboard menu, and show the date and battery percentage in the menu bar. While some people use terminal commands to code these settings, I find that looking for every possible command wastes more time than it would eventually save. That said, there are a few settings I find essential that can only be set using terminal.

```bash
# Unhide user library folder

chflags nohidden ~/Library

# Show full path in finder title

defaults write com.apple.finder \_FXShowPosixPathInTitle -bool true

# Show file extensions

defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# Always expand save panel

defaults write -g NSNavPanelExpandedStateForSaveMode -bool true

# Increase bluetooth audio quality

defaults write com.apple.BluetoothAudioAgent "Apple Bitpool Min (editable)" -int 40
```

## Automating installing your essentials

Now that your fresh install has sensible settings, we can begin reinstalling apps and dev tools. We'll use `brew cask` to automate the process rather than manually going to a bunch of different websites hunting for the right install button. This saves a ton of time and frustration.

To use brew cask, we'll need to install the Xcode command line tools by running `xcode-select --install` and then running the following to install Homebrew.

```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

We can use this time to install other common developer tools by running commands like `brew install git` or `brew install node` or `brew install zsh`. If you use zsh, now's the time to install `oh-my-zsh`:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Now you can use the `brew cask` command to install macOS applications. For example, it can be used to install iterm2, atom, and even Google Chrome. A good starting point is `brew cask install atom iterm2 bettertouchtool google-chrome spotify`, and you can see more that I use [here][brew-cask-list].

Now that all your essential apps and tools are installed, you can transfer back your saved dotfiles and import your app configurations to get everything back to how it was, minus all the accumulated clutter.

## Going further

Obviously this was a very generalized guide and you'll have your own additions for things like `rbenv`, `python3`, or `mongodb` to name the least. As you do so, make a note of that and add it to your own personal list. You'll find that most software is just a brew or curl command away, and adding the command to your own install list will make your next fresh install that much easier.

If you find automating your software installation to be mildly intoxicating, I encourage you to explore the world of [dotfiles][gh-dotfiles]. You can read them to find a range of possible configurations and shortcuts and even scripts to automate all the steps above. However, I caution you to go in knowing exactly what you're interested in improving in your flow, as it's very easy to fall down the rabbit hole and instead spend your whole night reading hundreds of others' keyboard shortcuts you would never remember yourself. I tried to strive for simplicity and practicality in [my own dotfiles][my-dotfiles].

If you are more interested in improving your daily workflows, I highly recommend [exploring zsh][exploring-zsh], downloading quicklook enhancements [quicklook extensions][qlstephen] to make rapidly browsing your files easier, and using a window management app like [Spectacle][spectacle].

[brew-cask-list]: https://github.com/ZachGawlik/dotfiles/blob/master/install/my-brew-cask-list.sh
[exploring-zsh]: https://www.smashingmagazine.com/2015/07/become-command-line-power-user-oh-my-zsh-z/
[gh-dotfiles]: https://dotfiles.github.io/
[my-dotfiles]: https://github.com/ZachGawlik/dotfiles
[qlstephen]: https://github.com/whomwah/qlstephen
[spectacle]: https://www.spectacleapp.com/
