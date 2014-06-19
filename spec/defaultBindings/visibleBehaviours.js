describe('Binding: Visible', function() {
    beforeEach(jasmine.prepareTestNode);
    
    it('Should add aria-hidden="true" only when the value is false and remove it when the value is true', function () { 
        var observable = new ko.observable(false);
        testNode.innerHTML = "<input data-bind='visible:myModelProperty()' />";
        ko.applyBindings({ myModelProperty: observable }, testNode);

        expect(testNode.childNodes[0].getAttribute("aria-hidden")).toEqual("true");
        observable(true);
        expect(testNode.childNodes[0].getAttribute("aria-hidden")).toEqual(undefined);
    });
});