ko.bindingHandlers.a11yvisible = {
    'update': function (elem, valueAccessor) {
        ko.bindingHandlers.visible.update.call(this, elem, valueAccessor);
        var value = ko.utils.unwrapObservable(valueAccessor());
        var isCurrentlyVisible = elem.style.display != "none";
        if (value && !isCurrentlyVisible) {
            elem.removeAttribute("aria-hidden");
        } else if ((!value) && isCurrentlyVisible) {
            elem.setAttribute("aria-hidden", "true");
        }
    }
};

ko.bindingHandlers.a11yVisibleFade = {
    
    init: function (elem, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        ko.bindingHandlers.a11yvisible.update.call(this, elem, valueAccessor);
    },
    update: function (elem, valueAccessor, allBindings) {
        var $elem = $(elem);

        var value = ko.utils.unwrapObservable(valueAccessor());

        var timeoutId = $elem.data("fadeTimeoutID");

        if (timeoutId !== undefined && timeoutId !== 0) {
            window.clearTimeout(timeoutId);
        }

        var timeoutId2 = $elem.data("fadeTimeoutID2");

        if (timeoutId2 !== undefined && timeoutId2 !== 0) {
            window.clearTimeout(timeoutId2);
        }


        if (!value) {
            $elem.removeClass("FadeIn").addClass("FadeOut");
            $elem.data("fadeTimeoutID", window.setTimeout(function () {
                ko.bindingHandlers.a11yvisible.update.call(this, elem, valueAccessor);
            }, 250));
            return undefined;
        }

        var fadeinTimeOut = Number(allBindings.get("a11yFadeInTimeout")) || 0; 
        $elem.data("fadeTimeoutID", window.setTimeout(function () {
            ko.bindingHandlers.visible.update.call(this, elem, valueAccessor);

            $elem.data("fadeTimeoutID2", window.setTimeout(function () {
                $elem.removeClass("FadeOut").addClass("FadeIn");
            }, 10));
        }, fadeinTimeOut));
    }
};

ko.bindingHandlers.stopBinding = {
    init: function () {
        return {
            controlsDescendantBindings: true
        };
    }
};

ko.bindingHandlers.flashUpdate = {
    update: function (elem, valueAccessor) {
        var value = valueAccessor();
        ko.unwrap(value);

        var $elem = $(elem);
        var firstTime = $elem.data("firstTime");
        if (firstTime === undefined) {
            $elem.data("firstTime", true);
            return undefined;
        }
        var timeoutId = $elem.data("timeoutID");

        if (timeoutId !== undefined && timeoutId !== 0) {
            window.clearTimeout(timeoutId);
        }

        $elem.removeClass("flashOut").addClass("flashIn");

        $elem.data("timeoutID", window.setTimeout(function () {
            $elem.removeClass("flashIn").addClass("flashOut");
            $elem.data("timeoutID", 0);
        }, 1000));
    }
};

//From http://tech.pro/blog/1863/10-knockout-binding-handlers-i-don-t-want-to-live-without
ko.bindingHandlers.toJSON = {
    update: function (element, valueAccessor) {
        return ko.bindingHandlers.text.update(element, function () {
            return ko.toJSON(valueAccessor(), null, 2);
        });
    }
};

ko.bindingHandlers.onEnter = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var allBindings = allBindingsAccessor();
        $(element).keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 13) {
                allBindings.onEnter.call(viewModel);
                return false;
            }
            return true;
        });
    }
};
