# 33_5_Markov_Text_Machine
## Public repo of exercise for unit 33.5: Markov Text Machine Exercise
We will complete the task of implementing our own Markov Text Machine for generating realistic machine-made text from an original source text. Wealso created a test file for our markov machines using Jest.

## How To Run
- Download a clone of this repo
- navigate to the directory using your teminal, use the node init command and the node package manager init commad to get all the dependcies loaded and your node repl ready at any time.
```
$ node init
$ npm init
```
- then you can call node to run any of the scripts like so:
```
$ node makeText.js file eggs.txt
... generated text from file 'eggs.txt' ...

$ node makeText.js url http://www.gutenberg.org/files/11/11-0.txt
... generated text from that URL ...
```
- if you have isntalled jest globably andcan reach it throught the terminal, you can run our tests from the terminal command line while your at the projects directory:
```
$ jest markov.test.js
```

## Requirements
You may need to use these tools to run the scripts.
- [Node](https://nodejs.org/en)
- [Jest](https://jestjs.io/)

## Development
This App was made using a WSL Ubunto distro running from a VS Code desktop environment.
Here are some extensions i use:
- [Prettier](https://prettier.io/) : [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

[Previous Repo]: https://github.com/papontem/33_4_Node_Files_Exercise/issues