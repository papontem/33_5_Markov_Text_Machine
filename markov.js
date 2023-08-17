/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");
		this.wordMapChains = this.makeChains();
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
	 * Then, whenever you want to get generated text from it:
	 *     mm.makeText();
	 *     mm.makeText(numWords=50);
	 *
	 * @returns {Object} A map (dictionary) of word chains. Keys are individual words, and values are arrays of possible following words.
	 */
	makeChains() {
		// TODO
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
