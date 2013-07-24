define(function (require) {

    var app = require('durandal/app');

    var card = function(suit, rank) {
        var self = this;

        self.suit = ko.observable(suit || "♥");
        self.rank = ko.observable(rank || 'A');

        self.draw = function () {
            app.trigger('drawCard', this);
        };
    };

    return card;
});