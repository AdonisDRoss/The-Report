// Example usage in The Report
// Load this array or JSON into your dialogue system.
const JOHNNY_COP_JOKES = require('./johnny_cop_jokes_1001.json').quotes;

function getRandomJohnnyJoke() {
  const i = Math.floor(Math.random() * JOHNNY_COP_JOKES.length);
  return JOHNNY_COP_JOKES[i].text;
}
