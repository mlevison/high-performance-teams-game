# High-Performance Teams Game

[![deploy](https://github.com/mlevison/high-performance-teams-game/workflows/deploy/badge.svg)](https://github.com/mlevison/high-performance-teams-game/actions?query=branch%3Amain)
[![codecov](https://codecov.io/gh/mlevison/high-performance-teams-game/branch/main/graph/badge.svg)](https://codecov.io/gh/mlevison/high-performance-teams-game)
[![published](https://img.shields.io/badge/published-gh--pages-green)](https://teamsgame.agilepainrelief.com/)

## Getting Started

### System Requirements

- [git][git] v2.13 or greater
- [NodeJS][node] v14 or greater
- [npm][npm] v7 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
git --version
node --version
npm --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

### Set up the project locally

```shell
git clone git@github.com:Xiphe/high-performance-teams-game.git
cd high-performance-teams-game
npm install
```

### Recommended development environment

It's recommended to use [Visual Studio Code](https://code.visualstudio.com/)
and have these extensions installed:

- `editorconfig.editorconfig`
- `dbaeumer.vscode-eslint`
- `esbenp.prettier-vscode`
- `stylelint.vscode-stylelint`
- `ms-vsliveshare.vsliveshare` (for pairing)

### Starting a development-server

In the project directory, run:

```shell
npm start
```

This should directly open [http://localhost:3000](http://localhost:3000) in your browser.

### Starting unit tests

In the project directory, run:

```shell
npm test
```

### Simulate games

In the project directory, run:

```shell
# Simulate 300 runs
npm run simulate 300
```

This will open a [jest](https://jestjs.io/) session in the terminal.

## Good resources to learn about everything used here:

- [JavaScript to Know for React](https://kentcdodds.com/blog/javascript-to-know-for-react)
- [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)
- [Getting started with Jest](https://jestjs.io/docs/en/getting-started)
- [Introduction to testing library](https://testing-library.com/docs/dom-testing-library/intro)

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[win-path]: https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/
[mac-path]: http://stackoverflow.com/a/24322978/971592
<!-- prettier-ignore-end -->
