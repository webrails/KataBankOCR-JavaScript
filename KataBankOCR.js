function KataBankOCR() {

    "use strict";
    //    _  _     _  _  _  _  _
    //  | _| _||_||_ |_   ||_||_|
    //  ||_  _|  | _||_|  ||_| _|

    this.entry_lines = 4;
    this.chars_digit_line = 3;
    this.digits_line = 9;
    this.line_break = '\n';

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
        var entry, self;
        self = this;
        return _.reduce(file.split(self.line_break), function (numbers, line, file_index) {
            entry = entry || [];
            entry.push(line);
            if (file_index % self.entry_lines === self.entry_lines - 1) {
                numbers.push(parseInt(_.reduce(_.range(0, self.chars_digit_line * self.digits_line, self.chars_digit_line),
                    function (numberChars, number_chars_index) {
                        return numberChars += self.charsValueMap[_.reduce(entry, function (digitChars, line) {
                            return digitChars + line.substr(number_chars_index, self.chars_digit_line);
                        }, "")];
                    }, ""), 10));
                entry = [];
            }
            return numbers;
        }, []);
    };
}