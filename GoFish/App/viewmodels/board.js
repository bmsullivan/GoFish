define(function(require) {
    var Card = require('viewmodels/card');
    
    var board = function () {
        var self = this;

        self.cards = ko.observableArray([]);
        self.playerHand = ko.observableArray([]);
        self.opponentHand = ko.observableArray([]);

        self.startNewGame = function() {
            self.cards(createDeck());

            for (var i = 0; i < 6; i++) {
                self.playerHand.push(self.cards.pop());
                self.opponentHand.push(self.cards.pop());
            }
        };

        self.startNewGame();
    };

    function createDeck() {
        var suits = ['♥', '♠', '♣', '♦'];
        var ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        var deck = [];
        
        for (var i in suits) {
            for (var j in ranks) {
                deck.push(new Card(suits[i], ranks[j]));
            }
        }

        return shuffle(deck);
    }
    
    function shuffle (array, rng) {
      var i = array.length, j, swap;
      if (!rng) rng = Math;
      while (--i) {
        j = rng.random() * (i + 1) | 0;
        swap = array[i];
        array[i] = array[j];
        array[j] = swap;
      }
      return array;
    }

    return board;
});