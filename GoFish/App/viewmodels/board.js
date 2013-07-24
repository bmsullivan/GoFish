define(function(require) {
    var Card = require('viewmodels/card');
    var app = require('durandal/app');
    
    var board = function () {
        var self = this, animationCount = 0;

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

        app.on('drawCard', function (card) {
            var cardNode = $('.card');
            var translateX = -(self.playerHand().length * 110) + 151;
            var keyframes =
                "@-webkit-keyframes draw" + animationCount + " { " +
                    "    0% { " +
                    "             -moz-transform: rotateY(0) rotate(45deg) skew(-18deg, -18deg) scale(.73) translate(-15px, 190px); " +
                    "             -webkit-transform: rotateY(0) rotate(45deg) skew(-18deg, -18deg) scale(.73) translate(-15px, 190px); " +
                    "             transform: rotateY(0) rotate(45deg) skew(-18deg, -18deg) scale(.73) translate(-15px, 190px); " +
                    "         } " +
                    "    50% { " +
                    "            -moz-transform: rotateY(180deg) translateX(-100px) translateY(40px) rotate(0); " +
                    "            -webkit-transform: rotateY(180deg) translateX(-100px) translateY(40px) rotate(0); " +
                    "            transform: rotateY(180deg) translateX(-100px) translateY(40px) rotate(0); " +
                    "       } " +
                    " " +
                    "    100% { " +
                    "            -moz-transform: rotateY(180deg) translateX(" + translateX + "px) translateY(200px) rotate(0); " +
                    "            -webkit-transform: rotateY(180deg) translateX(" + translateX + "px) translateY(200px) rotate(0); " +
                    "            transform: rotateY(180deg) translateX(" + translateX + "px) translateY(200px) rotate(0); " +
                    "         } " +
                    "} ";

            cardNode.on('webkitAnimationEnd', function(event) {
                self.cards.pop();
                self.playerHand.push(card);
            });
            
            document.styleSheets[document.styleSheets.length - 1].insertRule(keyframes, 0);
            cardNode[0].style.webkitAnimation = 'draw' + animationCount + ' 2s forwards';

            animationCount++;
            
        });

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