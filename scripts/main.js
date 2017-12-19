(function($) {

	// Document ready
	$(document).ready(function() {
		console.log("working");
		initGame();
	});

})(jQuery);

// make shuffle of array
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while(0 != currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}


//define the cards item
var symbols = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8'],
$deck = $('.deck'),
opened = [],
delay = 800;

//initial game
function initGame() {
	var cards = shuffle(symbols);
	$deck.empty();
	for(var i = 0; i < cards.length; i++) {
		$deck.append($('<li class="card"><i>' + cards[i] + '</i></li>'));
	}
}

//flip cards
$deck.on('click', '.card:not(".match, .open")', function() {
	var $this = $(this),
	card = $this.context.innerHTML;
	$this.addClass('open show');
	opened.push(card);
	console.log(opened);

	if(opened.length > 1) {
		if(card == opened[0]) {
			$deck.find('.open').addClass('match');
			setTimeout(function() {
				$deck.find('.match').removeClass('open show');
			}, delay);
		}
		else {
			$deck.find('.open').addClass('notmatch');
			setTimeout(function() {
				$deck.find('.open').removeClass('open show notmatch');
			}, delay / 1.5);
		}
		opened = [];
	}
	
});
