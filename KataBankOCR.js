function KataBankOCR() {

    "use strict";
    //    _  _     _  _  _  _  _
    //  | _| _||_||_ |_   ||_||_|
    //  ||_  _|  | _||_|  ||_| _|

    this.config = {
        linesPerEntry:4,
        charsPerDigitPerLine:3,
        digitsPerLine:9,
        charsPerLine:27, //(function () {
//            console.log('hui');
//            return this.config.charsPerDigitPerLine * this.config.digitsPerLine;
//        })(),
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

    // Takes an array of lines that represent the number to return
    this.processEntry = function (entry) {
        console.log('processEntry entry length: ' + entry.length);
        console.log('processEntry entry: ' + entry);
        var self, config, charsValueMap;
        self = this;
        config = self.config;
        charsValueMap = self.charsValueMap;
//        console.log(config);
//        console.log(charsValueMap);
        var returnReduce = _.reduce(_.range(0, config.charsPerLine, config.charsPerDigitPerLine),
            function (numberChars, index) {
                console.log('processEntry numberChars: ' + numberChars + 'END');
                console.log('processEntry index: ' + index);
//                var
                return numberChars += charsValueMap[_.reduce(entry, function (digitChars, line) {
                    console.log('line: ' + line);
                    console.log('digitChars: ' + digitChars);
                    return digitChars + line.substr(index, config.charsPerDigitPerLine);
                }, "")];
            }, "");
        console.log('returnReduce: ' + returnReduce);
        return(parseInt(returnReduce, 10))
    };

    // Takes a file and returns an Array of numbers representing the entries of the file
    this.processFile = function (file) {
        var numbers, entry, self;
        self = this;
        numbers = [];
        entry = [];
//        console.log('file: ' + file + 'END');
//        var howManyLines = file.split(self.config.lineBreak);
//        console.log('howManyLines: ' + howManyLines.length);
        _.each(file.split(self.config.lineBreak), function (line, index) {

            console.log('line: ' + line);
            console.log('index: ' + index);
            entry.push(line);
            if (index % self.config.linesPerEntry === self.config.linesPerEntry - 1) {
//                console.log('entry length: ' + entry.length);
//                console.log('entry: ' + entry);
                numbers.push(self.processEntry(entry));
                entry = [];
            }
        });

//        _.reduce(file.split(this.lineBreak), function() {
//
//        }, []);
        console.log('numbers: ' + numbers);
        return numbers;
    };
}