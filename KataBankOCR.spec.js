(function () {
    "use strict";
    describe("KataBankOCR", function () {
        beforeEach(function () {
            this.kataBankOCR = new KataBankOCR();
        });
        it("should be instantiable", function () {
            expect(this.kataBankOCR).toBeTruthy();
        });
        describe("run", function () {
            it("should be a function", function () {
                expect(_.isFunction(this.kataBankOCR.processEntry)).toBeTruthy();
            });
            it("should return an Integer", function () {
                expect(_.isNumber(this.kataBankOCR.processEntry("hhh"))).toBeTruthy();
            });
        });
    });
})();