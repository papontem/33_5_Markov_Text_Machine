/** Textual markov chain generator */

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
	 * You should be able to instantiate it like this: 
	 *    let mm = new MarkovMachine("the cat in the hat"); 
	 * 
	 * //SIDENOTE PAM FUTURE TODO: would we not like to create and generate text chains straight from terminal?
	 * for example:
	 * $ ndoe markov.js [optional-output-write-flag] [output-write-path] "input-string" [lenght-of-output] 
	 * 
	 * Then, whenever you want to get generated text from it:
	 *     mm.makeText();
	 *     mm.makeText(numWords=50);
	 *
	 * @returns {Object} A map (dictionary) of word chains. Keys are individual words, and values are arrays of possible following words.
	 */
	makeChains() {
		console.log("Making Chains.....");
		let chains = {}
		this.words.forEach( (word,index,array) => {
			// console.log("	 word:", word);
			// console.log("	index:", index);
			// console.log("	array:", array);
			// if word is not already in the key word chains add it
			if (!chains[word]) {
				chains[word] = [];
			}
			// if a next word exists, PUSH it to the array of the chain word were currently on
			if(this.words[index+1]){
				// console.log("next word?:", this.words[index+1]);
				chains[word].push(this.words[index+1])
			}else{
				// if there was no word, then weve reached the end.
				chains[word] = [null];
			}
		});
		// console.log("Resulting Chains:", chains);
		return chains
	}

	/**
	 * Generate random text from the Markov chains.
	 *
	 * @param {number} numWords - The number of words to generate in the text (default is 100).
	 * @returns {string} The generated random text.
	 */
	makeText(numWords = 100) {
		// TODO
	}
}

let mm = new MarkovMachine("the cat in the hat.");
console.log(mm.wordMapChains);