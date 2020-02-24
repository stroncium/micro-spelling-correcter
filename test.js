const test = require('ava');

const MicroSpellingCorrecter = require('.');

const testCorrections = (t, correcter, corrections) => {
	for (let [source, correction] of corrections) {
		t.is(correcter.correct(source), correction);
	}
};

test('example', t => {
	let correcter = new MicroSpellingCorrecter(['word', 'sample', 'hydralisk'], 1);

	t.is(correcter.correct('word'), 'word');
	t.is(correcter.correct('wurd'), 'word');
	t.is(correcter.correct('simple'), 'sample');
	t.is(correcter.correct('mutalisk'), undefined);
	t.is(correcter.correct('ampule'), undefined);
	t.is(correcter.correct('ampule', 2), 'sample');
});

test('word from set', t => {
	let correcter = new MicroSpellingCorrecter(['word', 'werd', 'bard', 'ward']);

	t.is(correcter.correct('word', 0), 'word');
	t.is(correcter.correct('word', 1), 'word');
	t.is(correcter.correct('word', 2), 'word');
	t.is(correcter.correct('word', 3), 'word');
});

test('distance 0', t => {
	testCorrections(t, new MicroSpellingCorrecter(['word', 'goodwurd'], 0), [
		['wurd', undefined],
		['wrd', undefined],
		['wrod', undefined],
		['woord', undefined],
		['weird', undefined],
	]);
});

test('distance 1', t => {
	testCorrections(t, new MicroSpellingCorrecter(['word', 'goodwurd'], 1), [
		['wurd', 'word'],
		['wrd', 'word'],
		['wrod', 'word'],
		['woord', 'word'],
		['weird', undefined],
	]);
});

test('distance 2', t => {
	testCorrections(t, new MicroSpellingCorrecter(['word', 'goodwurd'], 2), [
		['wurd', 'word'],
		['wrd', 'word'],
		['wrod', 'word'],
		['woord', 'word'],
		['weird', 'word'],
		['qerd', 'word'],
		['rd', 'word'],
		['owdr', 'word'],
		['wooord', 'word'],
		['weeird', undefined],
	]);
});

test('prefers shorter edit distance', t => {
	let correcter = new MicroSpellingCorrecter(['word', 'weird']);
	t.is(correcter.correct('werd', 2), 'word');
});
