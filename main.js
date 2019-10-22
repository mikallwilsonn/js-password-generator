// ----
// DOM Elements
const resultEl = document.querySelector( '#result' );
const lengthEl = document.querySelector( '#length' );
const uppercaseEl = document.querySelector( '#uppercase' );
const lowercaseEl = document.querySelector( '#lowercase' );
const numbersEl = document.querySelector( '#numbers' );
const symbolsEl = document.querySelector( '#symbols' );
const generateEl = document.querySelector( '#generate' );
const clipboardEl = document.querySelector( '#clipboard' );


// ----
// Generate Event Listener
generateEl.addEventListener( 'click', () => {
    const length = +lengthEl.value;

    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword( hasLower, hasUpper, hasNumber, hasSymbol, length );
});


// ----
// Copy Password to clipboard
clipboardEl.addEventListener( 'click', () => {
    const textarea = document.createElement( 'textarea' );
    const password = resultEl.innerText;

    if ( !password ) {
        return;
    }

    textarea.value = password;
    document.body.appendChild( textarea );
    textarea.select();
    document.execCommand( 'copy' );
    textarea.remove();
    alert( 'Password copied to clipboard.' );
});


// ----
// Generate Password
function generatePassword( lower, upper, number, symbol, length ) {
    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    const typesArray = [ {lower}, {upper}, {number}, {symbol} ]
        .filter( item => Object.values( item )[0] );


    if ( typesCount === 0 ) {
        return '';
    }

    for( let i = 0; i < length; i += typesCount ) {
        typesArray.forEach( type => {
            const functionName = Object.keys( type )[0];

            generatedPassword += randomFunction[functionName]();
        });
    }

    return generatedPassword.slice( 0, length );
}


// ----
// Generator Functions
const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


// Generate a random lowercase letter
function getRandomLower() {
    return String.fromCharCode( Math.floor( Math.random() * 26 ) + 97 );
}


// Generate a random uppercase letter
function getRandomUpper() {
    return String.fromCharCode( Math.floor( Math.random() * 26 ) + 65 );
}


// Generate a random number
function getRandomNumber() {
    return String.fromCharCode( Math.floor( Math.random() * 10 ) + 48 );
}


// Generate a random symbol
function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=/,.";

    return symbols[ Math.floor( Math.random() * symbols.length )];
}
