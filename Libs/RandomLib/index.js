let myDif = 0;
let jsDif = 0;

for (let i = 0; i < 1_000_000; i++) {
  if (i % 2 === 0) {
    myDif += Random.random();
    jsDif += Math.random();
  } else {
    myDif -= Random.random();
    jsDif -= Math.random();
  }
}

// console.log(myDif, jsDif);


function chiSquaredTest(values, numBins = 10) {
  // Calculate expected frequency for each bin
  const expectedFrequency = values.length / numBins;

  // Initialize observed and expected arrays
  const observed = Array(numBins).fill(0);
  const expected = Array(numBins).fill(expectedFrequency);

  // Populate observed array with frequencies
  for (const value of values) {
      const binIndex = Math.floor(value * numBins);
      observed[binIndex]++;
  }

  // Calculate chi-squared statistic
  let chiSquared = 0;
  for (let i = 0; i < numBins; i++) {
      const deviation = observed[i] - expected[i];
      chiSquared += (deviation * deviation) / expected[i];
  }

  return chiSquared;
}

// Example usage:
const valuesToTest = Array.from({ length: 1000 }, () => Math.random());
const myValuesToTest = Array.from({ length: 1000 }, () => Random.random());

const chiSquaredValue = chiSquaredTest(valuesToTest);
console.log('Chi-squared value:', chiSquaredValue);
console.log('Chi-squared value:', chiSquaredTest(myValuesToTest));

/* get random integer */
let myInt = Random.int(1, 100); // random integer in range from 1 to 100

/* get random float */
let myFloat = Random.float(1.01, 100); // random floating number from 1.01 to 100


/* get random string */
let myStr = Random.str(4) // random 4-char-long string with lowercase & uppercase letters,  
                          // digits and all special symbols

let anotherStr = Random.str(8, 'upper lower digits {#$@-.}'); // random 8-char-long string with 
                                                              // uppercase & lowercase letters, digits
                                                              // and special chars: #$@-.


/* get random item from an array */
let weather = ['rainy', 'snowy', 'sunny'];

let todayWeather = Random.choice(weather); // rainy | snowy | sunny


/* shuffle an array */
let cards = ['queen', 'king', 'ace'];

let shuffledCards = Random.shuffle(cards); // random variation of items placed


console.log(myInt, myFloat, anotherStr, todayWeather, shuffledCards);