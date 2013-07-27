define(function (require) {
    var Card = require('viewmodels/card');
    var app = require('durandal/app');

    var board = function () {
        var self = this;
        var animationCount = 0;
        var drawingFirstHand = false;
        var lastDrawCalled;

        self.cards = ko.observableArray([]);
        self.playerHand = ko.observableArray([]);
        self.opponentHand = ko.observableArray([]);

        self.startNewGame = function () {
            drawingFirstHand = true;
            lastDrawCalled = drawPlayerCard;
            drawPlayerCard();
        };

        app.on('drawPlayerCard', drawPlayerCard);
        app.on('drawOpponentCard', drawOpponentCard);

        function drawPlayerCard() {
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
                    "            -moz-transform: rotateY(180deg) translateX(" + translateX + "px) translateY(300px) rotate(0); " +
                    "            -webkit-transform: rotateY(180deg) translateX(" + translateX + "px) translateY(300px) rotate(0); " +
                    "            transform: rotateY(180deg) translateX(" + translateX + "px) translateY(300px) rotate(0); " +
                    "         } " +
                    "} ";

            cardNode.on('webkitAnimationEnd', function (event) {
                var card = self.cards.pop();
                self.playerHand.push(card);
            });

            document.styleSheets[document.styleSheets.length - 1].insertRule(keyframes, 0);
            cardNode[0].style.webkitAnimation = 'draw' + animationCount + ' 2s forwards';

            animationCount++;
        }

        function drawOpponentCard() {
            var cardNode = $('.card');
            var translateX = (self.opponentHand().length * 110) - 153;
            var keyframes =
                "@-webkit-keyframes draw" + animationCount + " { " +
                    "    0% { " +
                    "             -moz-transform: rotateY(0) rotate(45deg) skew(-18deg, -18deg) scale(.73) translate(-15px, 190px); " +
                    "             -webkit-transform: rotateY(0) rotate(45deg) skew(-18deg, -18deg) scale(.73) translate(-15px, 190px); " +
                    "             transform: rotateY(0) rotate(45deg) skew(-18deg, -18deg) scale(.73) translate(-15px, 190px); " +
                    "         } " +
                    "    50% { " +
                    "            -moz-transform: rotateY(0deg) translateX(100px) translateY(40px) rotate(0); " +
                    "            -webkit-transform: rotateY(0deg) translateX(100px) translateY(40px) rotate(0); " +
                    "            transform: rotateY(0deg) translateX(100px) translateY(40px) rotate(0); " +
                    "       } " +
                    " " +
                    "    100% { " +
                    "            -moz-transform: rotateY(0deg) translateX(" + translateX + "px) translateY(-162px) rotate(0); " +
                    "            -webkit-transform: rotateY(0deg) translateX(" + translateX + "px) translateY(-162px) rotate(0); " +
                    "            transform: rotateY(0deg) translateX(" + translateX + "px) translateY(-162px) rotate(0); " +
                    "         } " +
                    "} ";

            cardNode.on('webkitAnimationEnd', function (event) {
                var card = self.cards.pop();
                self.opponentHand.push(card);
            });

            document.styleSheets[document.styleSheets.length - 1].insertRule(keyframes, 0);
            cardNode[0].style.webkitAnimation = 'draw' + animationCount + ' 2s forwards';

            animationCount++;

        }

        self.afterTopCardCompose = function() {
            if (drawingFirstHand && (self.playerHand().length < 7 || self.opponentHand().length < 7)) {
                if (lastDrawCalled === drawPlayerCard) {
                    lastDrawCalled = drawOpponentCard;
                    drawOpponentCard();
                } else {
                    lastDrawCalled = drawPlayerCard;
                    drawPlayerCard();
                }
            } else {
                drawingFirstHand = false;
            }
        };

        self.cards(createDeck());

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

    function shuffle(array, rng) {
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