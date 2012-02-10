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
        this.extractLinesFrom(entry);
        return 0;
    };

    // Takes a file and returns an Array of numbers representing the entries of the file
    this.processFile = function (file) {
        var numbers, entry, self;
        self = this;
        numbers = [];
        entry = [];
        _.each(file.split(this.lineBreak), function(line, index){
            entry.push(line);
            if(index === self.config.linesPerEntry - 1){
                numbers.push(self.processEntry(entry));
                entry = [];
            }
        });
        return numbers;
    };
}


