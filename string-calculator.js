function parseInBase10 (string) {
    return parseInt(string, 10);
}

function escapeRegExpCharacters (delimiter) {
    return delimiter.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

function detectDelimiters (rawDelimiter) {
    if (rawDelimiter.length === 1) {
        return rawDelimiter;
    }
    else {
        let delimiters = rawDelimiter.substring(1, rawDelimiter.length -1)
                                     .split('][').map(escapeRegExpCharacters);
        return new RegExp(delimiters.join('|'));
    }
}

function getDelimiterAndRemoveItFromInput (input) {
    let defaultDelimiter = /[\n,]/;
    if (input.length >= 3 && input.substring(0,2) === "//") {
        return {
            delimiter: detectDelimiters(input.substring(2, input.indexOf('\n'))),
            input: input.substring(input.indexOf('\n'))
        };
    }
    else {
        return {
            delimiter: defaultDelimiter,
            input: input
        };
    }
}

function checkForNegativeNumbers (numbers) {
    let negativeNumbers = []
    for (number of numbers) {
        if (number < 0) {
            negativeNumbers.push(number)
        }
    }
    if (negativeNumbers.length > 0) {
        throw new Error("Negative numbers are not allowed : "
                        + negativeNumbers.join(", "))
    }
}

function ignoreLargeNumbers(numbers) {
    function isLowEnough(number) {
        return number <= 1000;
    }
    return numbers.filter(isLowEnough);
}

function processInput(input) {
    let delimiterAndInput = getDelimiterAndRemoveItFromInput(input);
    let delimiter = delimiterAndInput.delimiter;
    let string = delimiterAndInput.input;
    let string_array = string.split(delimiter);
    let numbers = string_array.map(parseInBase10);
    checkForNegativeNumbers(numbers);
    numbers = ignoreLargeNumbers(numbers);
    return numbers;
}

function sumElementsInArray (array) {
    return array.reduce(function(prev, curr) { return prev + curr; });
}

var logger = { log: function () {} };
var webService = {
    notify: function(text) { console.error("Error from the logger : " + text); }
}

function setLogger (customLogger) {
    logger = customLogger;
}

function setWebsService (customWebService) {
    webService = customWebService;
}

function add(input) {
    if (!input) {
        return 0;
    }
    let numbers = processInput(input);
    let sum = sumElementsInArray(numbers);
    try {
        logger.log(sum);
    }
    catch (e) {
        webService.notify(e.message);
    }
    return sum;
}

exports.setWebsService = setWebsService;
exports.setLogger = setLogger;
exports.add = add;
