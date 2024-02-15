# "Random" JS Library
```js
// set a name for Random library (optional)
let myPreferredName = Random;


/* get random integer */
let myInt = Random.int(1, 100); // random integer in range from 1 to 100


/* get random float */
let myFloat = Random.float(1.01, 100); // random floating number from 1.01 to 100


/* get random string */
let myStr = Random.str(4) // random 4-chars-long string with lowercase & uppercase letters,  
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
```
