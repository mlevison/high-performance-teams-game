# High-Performance Teams Game

## Getting Started

### System Requirements

- [git][git] v2.13 or greater
- [NodeJS][node] `^10.13 || 12 || 14`
- [npm][npm] v6 or greater

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

### Starting the test environment

In the project directory, run:

```shell
npm test
```

This will open up [cypress](https://www.cypress.io/) allowing you to select which
specs to run.

## Good resources to learn about everything used here:

- [JavaScript to Know for React](https://kentcdodds.com/blog/javascript-to-know-for-react)
- [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)
- [Write your first cypress test](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Write-your-first-test)
- [Introduction to testing library](https://testing-library.com/docs/dom-testing-library/intro)
