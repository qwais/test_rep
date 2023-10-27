const fetch = require('node-fetch');
const jest = require('jest');


describe('numbersapi test dates of 100 results', () => {
  let collectedFactsData;

  beforeAll(async () => {
    collectedFactsData = await collectRandomFacts();
    if (collectedFactsData.length === 0) {
      throw new Error('Array is empty.');
  });

  test('check that arrai it is not empty', () => {
    expect(collectedFactsData).not.toHaveLength(0);
  });

  test('check that array contains more than 5 elements', () => {
    expect(collectedFactsData).toHaveLengthGreaterThan(5);
  });

  test('check that length of each element of array is more than 10 characters', () => {
    collectedFactsData.forEach((fact) => {
      expect(fact).toHaveLengthGreaterThanOrEqual(10);
    });
  });
});


async function collectRandomFacts() {
  const randomArray = [];
  const monthMatched = /(?:January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec) \d{1,2}(st|nd|rd|th)/i;

  for (let i = 0; i < 100; i++) {
    const response = await fetch('http://numbersapi.com/random/year');
    const fact = await response.text();

    if (fact.match(monthMatched)) {
      randomArray.push(fact);
    }
  }

  return randomArray;
}
