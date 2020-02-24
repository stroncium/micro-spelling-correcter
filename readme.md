# micro-spelling-correcter

Simple breadth-first early terminating Levenshtein distance auto correcter for small sets of possible resulting strings.

Finds first suiting correction for word if there is one with distance less or equal than target maximum distance and returns it, otherwise returns `undefined`.

Cost of every edit is counted as 1, though for every analyzed distance search tries skips then replacements then transpositions then additions.

## Example

`npm install micro-spelling-correcter`

```
const MicroSpellingCorrecter = require('micro-spelling-correcter');

let correcter = new MicroSpellingCorrecter(
	[ // list of target words
		'word',
		'sample',
		'hydralisk',
	],
	1 // target maximum distance, defaults to 2
);

correcter.correct('word'); // 'word', will just check(and find) if word is set of target words and return right away
correcter.correct('wurd'); // 'word'
correcter.correct('simple'); // 'sample'
correcter.correct('mutalisk'); // undefined
correcter.correct('ampule'); // undefined
correcter.correct('ampule', 2); // 'sample', with custom edit distance of 2
```