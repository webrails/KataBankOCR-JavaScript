function KataBankOCR() {

    "use strict";
    //    _  _     _  _  _  _  _
    //  | _| _||_||_ |_   ||_||_|
    //  ||_  _|  | _||_|  ||_| _|

    this.config = {
        linesPerEntry:4,
        charsPerDigitPerLine:3,
        digitsPerLine:9,
        charsPerLine:(function () {
            return this.charsPerDigitPerLine * this.digitsPerLine;
        })(),
        lineBreak:"\n"
    };

    this.charsValueMap = {
        "     |  |":"0"
    };

    this.extractLinesFrom = function (entry) {
        return entry.split('\n');
    };

    // Takes an array of lines that represent the number to return
    this.processEntry = function (entry) {
        var numberChars, digitChars, self;
        self = this;
        digitChars = "";
        numberChars = "";
        _.each(_.range(0, this.config.charsPerLine, this.config.charsPerDigitPerLine), function (index) {

//            _.each(entry, function (line) {
//                digitChars += line.substr(index, self.config.charsPerDigitPerLine);
//            });
//            numberChars += self.charsValueMap(digitChars);
//            digitChars = "";

            numberChars += self.charsValueMap(_.reduce(entry, function (memo, line) {
                return memo + line.substr(index, self.config.charsPerDigitPerLine);
            }, ""));

        });
        return parseInt(numberChars, 10);
    };

    // Takes a file and returns an Array of numbers representing the entries of the file
    this.processFile = function (file) {
        var numbers, entry, self;
        self = this;
        numbers = [];
        entry = [];
        _.each(file.split(this.lineBreak), function (line, index) {
            entry.push(line);
            if (index === self.config.linesPerEntry - 1) {
                numbers.push(self.processEntry(entry));
                entry = [];
            }
        });
        return numbers;
    };
}


