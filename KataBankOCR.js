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
        "     |  |   ":"1",
        " _   |      ":"2",
        " _  _| _|   ":"3",
        "   |_|  |   ":"4",
        " _ |_  _|   ":"5",
        " _ |_ |_|   ":"6",
        " _   |  |   ":"7",
        " _ |_||_|   ":"8",
        " _ |_| _|   ":"9"
    };

    this.extractLinesFrom = function (entry) {
        return entry.split('\n');
    };

    // Takes an array of lines that represent the number to return
    this.processEntry = function (entry) {
        var self;
        self = this;
        return parseInt(_.reduce(_.range(0, this.config.charsPerLine, this.config.charsPerDigitPerLine), function (numberChars, index) {
            numberChars += self.charsValueMap(_.reduce(entry, function (digitChars, line) {
                return digitChars + line.substr(index, self.config.charsPerDigitPerLine);
            }, ""));
        }, ""), 10);
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


