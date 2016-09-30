stringCalculator = require('./string-calculator')

function assert(test, testDescription) {
    if (!test) {
        throw "Test failed : " + testDescription;
    }
}

{
    let string = ""
    let result = stringCalculator.add(string)
    assert(result === 0, "should return 0 when empty string")
}

{
    let string = "2"
    let result = stringCalculator.add(string)
    assert(result === 2,
        "should return the number when the string contains one number")
}

{
    let string = "2,13"
    let result = stringCalculator.add(string)
    assert(result === 15,
        "should return the sum when the string contains two number")
}

{
    let string = "2,13,7,0,4"
    let result = stringCalculator.add(string)
    assert(result === 26, "should handle unknown size of string")
}

{
    let string = "1\n2,3"
    let result = stringCalculator.add(string)
    assert(result === 6, "should handle a new line as a separator")
}

{
    let string = "//;\n1;2;3"
    let result = stringCalculator.add(string)
    assert(result === 6, "should handle custom separator")
}

{
    let string = "1,-2,4,-5"
    try {
        let result = stringCalculator.add(string)
        throw new Error("no exception raised")
    }
    catch (e) {
        assert(e.message !== "no exception raised",
        "should raise exception when negative numbers are present")
    }
}

{
    let string = "1,-2,4,-5"
    try {
        let result = stringCalculator.add(string)
        throw new Error("no exception raised")
    }
    catch (e) {
        assert(e.message === "Negative numbers are not allowed : -2, -5",
         "should display all negative numbers when present")
    }
}

{
    let string = "2,1001"
    let result = stringCalculator.add(string)
    assert(result === 2, "should ignore numbers bigger than 1000")
}


{
    let string = "//[***]\n1***2***3"
    let result = stringCalculator.add(string)
    assert(result === 6, "should handle long custom separator")
}

{
    let string = "//[*][%]\n1*2%3"
    let result = stringCalculator.add(string)
    assert(result === 6, "should handle multiple separators")
}

{
    let string = "//[***][%]\n1***2%3"
    let result = stringCalculator.add(string)
    assert(result === 6, "should handle multiple long separators")
}

{
    var textLogged;
    let logger = {
        log: function(text) {
            textLogged = text;
        }
    }
    stringCalculator.setLogger(logger);
    let string = "2,13"
    let result = stringCalculator.add(string)
    assert(textLogged == 15, "should send the result to the logger")
}

{
    let brokenLogger = {
        log: function() {
            throw new Error("Error from boken logger")
        }
    }
    var notification;
    let webService = {
        notify: function(text) {
            notification = text
        }
    }
    stringCalculator.setLogger(brokenLogger);
    stringCalculator.setWebsService(webService);
    let string = "2,13"
    try {
        let result = stringCalculator.add(string)
    }
    catch (e) {
        assert(false, "should catch the exception thrown by the logger")
    }
    assert(notification == "Error from boken logger",
    "should notify the web service with the logger message")
}

console.log("All tests passed !");
