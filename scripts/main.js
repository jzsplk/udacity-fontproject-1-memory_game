(function($) {

	// Document ready
	$(document).ready(function() {
		console.log("game working");
		initGame();
	});

})(jQuery);

//define the cards item
var symbols = ['11', '1511', '30551', '4474349', '50982', '50983', '695118', '78182', '11', '1511', '30551', '4474349', '50982', '50983', '695118', '78182'],
$deck = $('.deck'),
$scorePanel = $('.score-panel'),
$movesNumber = $scorePanel.find('.moves'),
$ratingStars = $scorePanel.find('i'),
$restart = $scorePanel.find('.restart'),
opened = [],
delay = 800,
match = 0,
moves = 0,
cardsToMatch = symbols.length / 2,
rant3stars = cardsToMatch + 7,
rant2stars = cardsToMatch + 9,
rant1stars = cardsToMatch + 11;

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

//initial game
function initGame() {
	var cards = shuffle(symbols);
	$deck.empty();
	match = 0;
	moves = 0;
	$movesNumber.html(moves);
	$ratingStars.removeClass('fa-star-o').addClass('fa-star');
	for(var i = 0; i < cards.length; i++) {
		$deck.append($('<li class="card"><img src="images/icons/' + cards[i] + '.png"></img></li>'));
	}
	getTime();
}

//Timer
function getTime() {
	var startTime = new Date().getTime();

	    timer = setInterval(function() {
		var now = new Date().getTime();

		//get time elapset
		var elapset = now - startTime;
		var minutes = Math.floor((elapset % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((elapset % (1000 * 60)) / 1000);

		if(seconds < 10) {
			seconds = "0" + seconds;
		}

		var currentTime = minutes + ":" + seconds;
		$(".clock").text(currentTime);
	}, 750);
};

//end Game function
function endGame(moves, score) {
	clearInterval(timer);
	var time = $('.clock').text();
	swal({
			position: 'left',
		    type: 'success',
		    title: 'Happy Birthday 大头！！',
		    text: '用了 ' + moves + ' 步,' + '用时' + time +', 得到 ' + score + '星， ' + ' Winner Winner Chicken Dinner!',
		    confirmButtonColor: '#9bcb3c',
		    confirmButtonText: '再来一局',
	}).then(function(isConfirm) {
		if(isConfirm) {
			initGame();
		}
	});
}

//rating stars
function ratingStars(moves) {
	var rating = 3;
	if (moves > rant3stars && moves < rant2stars) {
		$ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
		rating = 2;
	} else if (moves > rant2stars && moves < rant1stars) {
		$ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
		rating = 1;
	} else if (moves > rant1stars) {
		$ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
		rating = 0;
	}
	console.log(moves);
	console.log(rating);
	return { score: rating };

}


//restart button
$restart.on('click', function() {
	swal({
		position: 'center',
		title: '亲，确定要退出么？',
		text: '你的记忆会丢失哦！',
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '不，哥从头再来',
	}).then(function(isConfirm) {
		if(isConfirm.value) {
			swal(
				'重新开始了',
				'GG GL',
				'success'
			);
			clearInterval(timer);
			initGame();
		}
	});
});


//flip cards logic
$deck.on('click', '.card:not(".match, .open")', function() {
	var $this = $(this),
	card = $this.context.innerHTML;
	$this.addClass('open show');
	opened.push(card);
	console.log(opened);

	if(opened.length > 1) {
		if(card == opened[0]) {
			$deck.find('.open').addClass('match flipInX');
			setTimeout(function() {
				$deck.find('.match').removeClass('open show flipInX');
			}, delay);
			match++;
		}
		else {
			$deck.find('.open').addClass('notmatch wobble');
			setTimeout(function() {
				$deck.find('.open').removeClass('open show notmatch wobble');
			}, delay);
		}

		opened = [];
		moves++;
		ratingStars(moves);
		$movesNumber.html(moves);
	}

	//end Game if match equal to cardsToMatch
	if(match === cardsToMatch) {
		ratingStars(moves);
		var score = ratingStars(moves).score;
		setTimeout(function() {
			endGame(moves, score);
		}, 500);
	}
	
});





