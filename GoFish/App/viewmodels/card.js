define(function() {
    var card = function(suit, rank) {
        var self = this;

        self.suit = ko.observable(suit || "♥");
        self.rank = ko.observable(rank || 'A');
        self.isFlipped = ko.observable(false);

        self.turnCardOver = function() {
            self.isFlipped(!self.isFlipped());
        };
    };

    return card;
});