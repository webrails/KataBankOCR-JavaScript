(function () {
    "use strict";
    describe("KataBankOCR", function () {
        var kataBankOCR;
        beforeEach(function () {
            this.kataBankOCR = new KataBankOCR();
            this.test123456789 = "    _  _     _  _  _  _  _ " + "\n" +
                                 "  | _| _||_||_ |_   ||_||_|" + "\n" +
                                 "  ||_  _|  | _||_|  ||_| _|" + "\n" +
                                 "                           ";
            this.test123456781 = "    _  _     _  _  _  _    " + "\n" +
                                 "  | _| _||_||_ |_   ||_|  |" + "\n" +
                                 "  ||_  _|  | _||_|  ||_|  |" + "\n" +
                                 "                           ";
        });
        it("should be instantiable", function () {
            expect(this.kataBankOCR).toBeTruthy();
        });
        describe("Process file", function () {
            it("should be a function", function () {
                expect(_.isFunction(this.kataBankOCR.processFile)).toBeTruthy();
            });
            xit("should return an empty Array", function () {
                expect(_.isArray(this.kataBankOCR.processFile(""))).toBeTruthy();
                expect(this.kataBankOCR.processFile("")).toEqual([]);
            });
            it("should return an Array with one argument", function () {
                expect(_.isArray(this.kataBankOCR.processFile(this.test123456789))).toBeTruthy();
                expect(this.kataBankOCR.processFile(this.test123456789).length).toEqual(1);
                expect(this.kataBankOCR.processFile(this.test123456789)[0]).toEqual(123456789);
            });
            xit("should return an Array with two arguments", function () {
                var fileWithTwoEntries = this.test123456789 + "\n" + this.test123456781;
                expect(_.isArray(this.kataBankOCR.processFile(fileWithTwoEntries))).toBeTruthy();
                expect(this.kataBankOCR.processFile(fileWithTwoEntries).length).toEqual(2);
                expect(this.kataBankOCR.processFile(fileWithTwoEntries)[0]).toEqual(123456789);
                expect(this.kataBankOCR.processFile(fileWithTwoEntries)[1]).toEqual(123456781);
            });
        });
    });
})();