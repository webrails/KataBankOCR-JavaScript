function KataBankOCR() {

    "use strict";
    //    _  _     _  _  _  _  _
    //  | _| _||_||_ |_   ||_||_|
    //  ||_  _|  | _||_|  ||_| _|

    this.config = {
        linesPerEntry:4,
        charsPerDigitPerLine:3,
        digitsPerLine:9,
        lineBreak:"\n"
    };

    this.charsValueMap = {
        "     |  |   ":"1",
        " _  _||_    ":"2",
        " _  _| _|   ":"3",
        "   |_|  |   ":"4",
        " _ |_  _|   ":"5",
        " _ |_ |_|   ":"6",
        " _   |  |   ":"7",
        " _ |_||_|   ":"8",
        " _ |_| _|   ":"9"
    };

    // Takes a file and returns an Array of numbers representing the entries of the file
    this.processFile = function (file) {
        var numbers, entry, self;
        self = this;
        numbers = [];
        entry = [];
        _.each(file.split(self.config.lineBreak), function (line, index) {
            entry.push(line);
            if (index % self.config.linesPerEntry === self.config.linesPerEntry - 1) {
                numbers.push(parseInt(_.reduce(_.range(0, self.config.charsPerDigitPerLine * self.config.digitsPerLine, self.config.charsPerDigitPerLine),
                    function (numberChars, index) {
                        return numberChars += self.charsValueMap[_.reduce(entry, function (digitChars, line) {
                            return digitChars + line.substr(index, self.config.charsPerDigitPerLine);
                        }, "")];
                    }, ""), 10));
                entry = [];
            }
        });
        return numbers;
    };
}