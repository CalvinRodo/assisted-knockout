ko.bindingHandlers['a11y-visible'] = {
    'update': function (elem, valueAccessor) {
        
        ko.bindingHandlers.visible.update.call(this, elem, valueAccessor);
        
        var value = ko.utils.unwrapObservable(valueAccessor());
        
        var isCurrentlyVisible = !(elem.style.display == "none");
        
        if (value && !isCurrentlyVisible) {
            elem.removeAttribute("aria-hidden");
        }
        else if ((!value) && isCurrentlyVisible) {
            elem.setAttribute("aria-hidden","true");
        }
    }
};