(function($) {

	// Document ready
	$(document).ready(function() {
		console.log("working");
		initGame();
	});

})(jQuery);

//define the cards item
var symbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
$deck = $('.deck');

//initial game
function initGame() {
	var cards = symbols;
	$deck.empty();
	for(var i = 0; i < cards.length; i++) {
		$deck.append($('<li class="card"><i>' + cards[i] + '</i></li>'));
	}
}
