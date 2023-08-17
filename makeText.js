/** Command-line tool to generate Markov text.
 * We want a script, makeText.js, that works like this:
 *
 * $ node makeText.js file eggs.txt
 * ... generated text from file 'eggs.txt' ...
 *
 * $ node makeText.js url http://www.gutenberg.org/files/11/11-0.txt
 *  ... generated text from that URL ...
 * Make sure it handles errors (can’t read file or can’t read URL) by printing a nice and complete error message and quitting program.
 */

const process = require("node:process");
const fs = require("fs");
const axios = require("axios");
const url = require("node:url");
const path = require("node:path");

const { MarkovMachine } = require("./markov.js");

// exit listener
process.on("exit", function (code) {
	console.log(`EXITING WITH CODE: ${code}`);
});

// console.log(process.argv);
// for (let arg of process.argv) {
// 	console.log(arg);
// }

let source;
let sourceType;
let outputFilePath; // PAM FUTURE TODO: combine logic from previous exercise to write to a file to store markov text created by this js script

// Get source type else exit
if (process.argv[2] === "file" || process.argv[2] === "url") {
	sourceType = process.argv[2];
	source = process.argv[3];
	console.log("Source Type:", sourceType);
	console.log("     Source:", source);
} else {
	console.log("User did not specify if source type is a 'file' or a 'url'");
	process.exit(1);
}

// Read local resource (file)
async function cat(path) {
	return new Promise(async function (resolve, reject) {
		try {
			const data = await fs.promises.readFile(path, "utf8");
			resolve(data);
		} catch (error) {
			console.error(`ERROR when trying to read ${path}:\n`, error);
			reject(error);
		}
	});
}

// get online resource (URL)
async function webCat(url) {
	return new Promise(async function (resolve, reject) {
		try {
			const response = await axios.get(url);
			resolve(response.data);
		} catch (error) {
			console.error(`ERROR when trying to fetch ${url}:\n`, error);
			reject(error);
		}
	});
}

// Helpful validation functions
// validate if input is a URL
function isURL(input) {
	try {
		new URL(input);
		return true;
	} catch (error) {
		// console.error(`The input: ${input} was not a valid URL: ${error}`);
		return false;
	}
}

// validate if input is a file path
function isPATH(input) {
	try {
		path.parse(input);
		return true;
	} catch (error) {
		// console.error(`The input: ${input} was not a valid path string: ${error}`);
		return false;
	}
}

// function to determine if we should get the url or read the file at path based on input
async function getReadWriteData(source, outputFilePath = null) {
	if (isURL(source)) {
		// console.log("USING AXIOS webcat");
		try {
			const data = await webCat(source);
			// console.log(data);

			// write to file if outputFilePath is defined
			if (outputFilePath && isPATH(outputFilePath)) {
				writeToFile(outputFilePath, data);
			}

			return data;
		} catch (error) {
			console.error(`ERROR: ${error}`);
			process.exit(1);
		}
	} else if (isPATH(source)) {
		// console.log("USING FILE SYSTEM cat");

		try {
			const data = await cat(source);
			// console.log(data);

			// write to file if outputFilePath is defined
			if (outputFilePath && isPATH(outputFilePath)) {
				writeToFile(outputFilePath, data);
			}
			return data;
		} catch (error) {
			console.error(`ERROR: ${error}`);
			process.exit(1);
		}
	} else {
		console.error("ERROR: Destination sent was not a valid path or URL");
		process.exit(1);
	}
}

// Make markov machine and make text out of source's text data
async function main() {
	// get string data
	let data = String(await getReadWriteData(source));

	// console.log(data);
	// create markov machine and feedit string data
	let mm = new MarkovMachine(data);

	// create the text
	result = mm.makeText();

	// put text on console
	console.log(result);

	// return result
}
main();
