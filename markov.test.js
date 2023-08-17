const { MarkovMachine } = require("./markov.js");
describe("MakrovMachine Class Tests", function () {
    
    const testString = "i am a test string i"

    beforeEach(function () {
        console.log("BEFORE EACH CLASS TEST!");
    });
    
    // afterEach(function () {
    //     console.log("AFTER EACH!");
    // });

    // beforeAll(function () {
    //     console.log("BEFORE ALL");
    // });

    // afterAll(function () {
    //     console.log("AFTER ALL");
    // });

    describe("Test Suite for markov machine's intitializing this.words' split", function () {
        
        beforeAll(function () {
            console.log("BEFORE ALL this.words BOTTOM TEST!");
        });
        // beforeEach(function () {
        //     console.log("BEFORE EACH this.words BOTTOM TEST!");
        // });

        test("Test for empty input string", function () {
            // Test Logic
            let input = testString.slice(0,0)
            // console.log("Test String:",input);
            let mm = new MarkovMachine(input);
            // Expectations
            expect(mm.words).toEqual([]);
        });
        test("Test for input string with one word", function () {
            // Test Logic
            let input = testString.slice(0,1)
            // console.log("Test String:",input);
            let mm1 = new MarkovMachine(input);
            // Expectations
            expect(mm1.words).toEqual(["i"]);
        });

        test("Test for input string with two words", function () {
            // Test Logic
            //  0123456789
            // "i am a test string i"
            let input = testString.slice(0,4)
            // console.log("Test String:",input);
            let mm2 = new MarkovMachine(input);
            // console.log("words:", mm2.words);
            // Expectations
            expect(mm2.words).toEqual(["i", "am"]);
        });

        test("Test for input string with multiple words", function () {
            // Test Logic
            let input = testString.slice(0,testString.length)
            // console.log("Test String:",input);
            let mm3 = new MarkovMachine(input);
            // Expectations
            expect(mm3.words).toEqual(["i", "am", "a", "test", "string", "i"]);
        });
    });

    describe("Test Suite for markov machine's this.makeChains succesfully builds this.wordMapChains", function () {
        
        beforeAll(function () {
            console.log("BEFORE ALL this.makeChains BOTTOM TEST!");
        });
        // beforeEach(function () {
        //     console.log("BEFORE EACH this.makeChains BOTTOM TEST!");
        // });

        test("Test for expected map object with empty input string", function () {
            // Test Logic
            let mm = new MarkovMachine("");
            // console.log("mm's word chain map:",mm.wordMapChains);
            // Expectations
            expect(mm.wordMapChains).toEqual(expect.any(Object));
            expect(mm.wordMapChains).toEqual({});
        });
        test("Test for expected map object with string with one word", function () {
            // Test Logic
            let mm1 = new MarkovMachine("i");
            // console.log("mm1's word chain map:",mm1.wordMapChains);
            // Expectations
            expect(mm1.wordMapChains).toEqual(expect.any(Object));
            expect(mm1.wordMapChains).toEqual({
                "i": [null]
            });
        });

        test("Test for expected map object with string with two words", function () {
            // Test Logic
            let mm2 = new MarkovMachine("i am");
            // console.log("mm2's word chain map:",mm2.wordMapChains);
            // Expectations
            expect(mm2.wordMapChains).toEqual(expect.any(Object));
            expect(mm2.wordMapChains).toEqual({
                "i": ["am"],
                "am": [null]
            });
        });

        test("Test for expected map object with string with multiple words", function () {
            // Test Logic
            let mm3 = new MarkovMachine("i am a test string i");
            // console.log("mm3's word chain map:",mm3.wordMapChains);
            // Expectations
            expect(mm3.wordMapChains).toEqual(expect.any(Object));
            expect(mm3.wordMapChains).toEqual({
                     "i":["am" , null],
                    "am":["a"],
                     "a":["test"],
                  "test":["string"],
                "string":["i"],
            });
        });
    });

    describe("Test Suite for markov machine's makeText() function sucessfully creates text as expected",function(){

        test("Test for makeText() to return expected string with 0 words",function(){
            // Test Logic
            let input = testString.slice(0,testString.length)
            // console.log("Test String:",input);
            let mm = new MarkovMachine(input);
            let createdText = mm.makeText(0)
            // console.log("createdText:",createdText);
            // Expectations
            expect(createdText).toEqual(expect.any(String))
            expect(createdText).toEqual("")
        });
        test("Test for makeText() to return expected string with 1 word",function(){
            // Test Logic
            let input = testString.slice(0,testString.length)
            // console.log("Test String:",input);
            let mm = new MarkovMachine(input);
            let createdText = mm.makeText(1)
            // console.log("createdText:",createdText);
            // Expectations
            expect(createdText).toEqual(expect.any(String))
            expect(createdText.split(/[ \r\n]+/).length).toEqual(1)
        });
        test("Test for makeText() to return expected string with 2 words",function(){
            // Test Logic
            let input = testString.slice(0,testString.length)
            // console.log("Test String:",input);
            let mm = new MarkovMachine(input);
            let createdText = mm.makeText(2)
            // console.log("createdText:",createdText);
            // Expectations
            expect(createdText).toEqual(expect.any(String))
            expect(createdText.split(/[ \r\n]+/).length).toEqual(2)
        });
        test("Test for makeText() to return expected string with 100 words by default",function(){
            // Test Logic
            let input = testString.slice(0,testString.length)
            // console.log("Test String:",input);
            let mm = new MarkovMachine(input);
            let createdText = mm.makeText()
            // console.log("createdText:",createdText);
            // Expectations
            expect(createdText).toEqual(expect.any(String))
            expect(createdText.split(/[ \r\n]+/).length).toEqual(100)
        });


            

    });
});
