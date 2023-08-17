/** Textual markov chain generator
 * You should be able to instantiate it like this:
 *    let mm = new MarkovMachine("the cat in the hat");
 *
 * //SIDENOTE PAM FUTURE TODO: would we not like to create and generate text chains straight from terminal?
 * for example:
 *     $ ndoe markov.js [optional-output-write-flag] [output-write-path] "input-string" [lenght-of-output]
 *
 * Then, whenever you want to get generated text from it:
 *     mm.makeText();
 *     mm.makeText(numWords=50);
 */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		// console.log("input.split:", words);

		this.words = words.filter((c) => c !== "");
		// console.log("Words Filtered:", this.words);

		this.wordMapChains = this.makeChains();
		// console.log("Words Map Chain:", this.wordMapChains);
	}

	/** set markov chains:
	 * Generate Markov chains map of chains of word → possible-next-words from the provided text.
	 *
	 * For example, given the text "the cat in the hat", the resulting chains will be:
	 * {
	 *     "the": ["cat", "hat"],
	 *     "cat": ["in"]  ,
	 *      "in": ["the"] ,
	 *     "hat": [null]
	 * }
	 *
	 *
	 * @returns {Object} A map (dictionary) of word chains. Keys are individual words, and values are arrays of possible following words.
	 */
	makeChains() {
		// console.log("Making Chains.....");
		let chains = {};
		this.words.forEach((word, index, array) => {
			// console.log("Current word:", word);
			// console.log("	index:", index);
			// console.log("	array:", array);

			// if word is not already in the key word chains add it
			if (!chains[word]) {
				// console.log("Appended as a key");
				chains[word] = [];
			}
			// if a next word exists, PUSH it to the array of the chain word were currently on
			if (this.words[index + 1]) {
				// console.log("A next word Exists!");
				// console.log("next word?:", this.words[index+1]);
				chains[word].push(this.words[index + 1]);
				// console.log(`Pushed it!\nchains[${word}] = ${chains[word]} `);
				// console.log("Current map of word chains:",chains);
			} else {
				// if there was no word, then weve reached the end.
				// chains[word] = [null]; // probable cause of the bug // PAM: :D GOT IT 🎉🎉🎉!!
				chains[word].push(null); // PAM: Fixed
			}
		});
		// console.log("Resulting Chains:", chains);
		return chains;
	}

	/**
	 * Generate random text from the Markov chains.
	 *
	 * @param {number} numWords - The number of words to generate in the text (default is 100).
	 * @returns {string} The generated random text.
	 */
	makeText(numWords = 100) {
		// console.log("Making text of length:", numWords);
		let resultText = [];

		// Inspiration for getRandKeyFromObj
		// https://stackoverflow.com/a/15106541
		// var randomProperty = function (obj) {
		// 	var keys = Object.keys(obj);
		// 	return obj[keys[ keys.length * Math.random() << 0]];
		// };
		// https://stackoverflow.com/a/4550514
		// const randomElement = array[Math.floor(Math.random() * array.length)];

		// Helper function to randomly select a key from an object
		let getRandKeyFromObj = function (obj) {
			let keysArray = Object.keys(obj);
			let randomKey = keysArray[Math.floor(Math.random() * keysArray.length)];
			// console.log("random key:", randomKey);
			return randomKey;
		};

		// init word tracker
		let currentWord = getRandKeyFromObj(this.wordMapChains);
		// console.log("Starting with:", currentWord);

		// Create the generated text array
		while (resultText.length < numWords) {
			// Get the chain links from our current word key; will be null if the word is a dead end
			let possibleNextWords = this.wordMapChains[currentWord];

			if (possibleNextWords) {
				// Add the current word to the generated text
				resultText.push(currentWord);

				// Randomly pick which chain link to use next
				let nextWord =
					possibleNextWords[
						Math.floor(Math.random() * possibleNextWords.length)
					];
				// console.log("Next Word in Chain:", nextWord);

				currentWord = nextWord;
			} else {
				// Previously picked word led to a dead end, pick another word and start over
				currentWord = getRandKeyFromObj(this.wordMapChains);
			}
		}

		// console.log(resultText);
		return resultText.join(" ");
	}
}

module.exports = {
	MarkovMachine,
};

// let mm = new MarkovMachine("the cat in the hat");
// console.log(mm.wordMapChains);
// console.log(mm.makeText(numWords=12));
