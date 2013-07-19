define(function() {
    var card = function(suit, rank) {
        var self = this;

        self.suit = ko.observable(suit || "H");
        self.rank = ko.observable(rank || 1);
    };

    return card;
});