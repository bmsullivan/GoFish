define(function(require) {
    var Card = require('viewmodels/card');
    
    var board = function () {
        var self = this;

        self.cards = ko.observableArray(createDeck());
    };

    function createDeck() {
        var suits = ['H', 'S', 'C', 'D'];
        var deck = [];
        
        for (var i in suits) {
            for (var j = 1; j < 14; j++) {
                deck.push(new Card(suits[i], j));
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