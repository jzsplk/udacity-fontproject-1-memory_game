function shuffle(e){for(var t=e.length,a,n;0!=t;)n=Math.floor(Math.random()*t),t-=1,a=e[t],e[t]=e[n],e[n]=a;return e}function initGame(){var e=shuffle(symbols);$deck.empty(),match=0,moves=0,$movesNumber.html(moves),$ratingStars.removeClass("fa-star-o").addClass("fa-star");for(var t=0;t<e.length;t++)$deck.append($('<li class="card"><img src="images/icons/'+e[t]+'.png"></img></li>'));getTime()}function getTime(){var e=(new Date).getTime();timer=setInterval(function(){var t=(new Date).getTime(),a=t-e,n=Math.floor(a%36e5/6e4),o=Math.floor(a%6e4/1e3);o<10&&(o="0"+o);var s=n+":"+o;$(".clock").text(s)},750)}function endGame(e,t){clearInterval(timer);var a=$(".clock").text();swal({position:"left",type:"success",title:"Happy Birthday 大头！！",text:"用了 "+e+" 步,用时"+a+", 得到 "+t+"星，  Winner Winner Chicken Dinner!",confirmButtonColor:"#9bcb3c",confirmButtonText:"再来一局"}).then(function(e){e&&initGame()})}function ratingStars(e){var t=3;return e>rant3stars&&e<rant2stars?($ratingStars.eq(2).removeClass("fa-star").addClass("fa-star-o"),t=2):e>rant2stars&&e<rant1stars?($ratingStars.eq(1).removeClass("fa-star").addClass("fa-star-o"),t=1):e>rant1stars&&($ratingStars.eq(0).removeClass("fa-star").addClass("fa-star-o"),t=0),{score:t}}!function($){$(document).ready(function(){console.log("game working"),initGame()})}(jQuery);var symbols=["11","1511","30551","4474349","50982","50983","695118","78182","11","1511","30551","4474349","50982","50983","695118","78182"],$deck=$(".deck"),$scorePanel=$(".score-panel"),$movesNumber=$scorePanel.find(".moves"),$ratingStars=$scorePanel.find("i"),$restart=$scorePanel.find(".restart"),opened=[],delay=800,match=0,moves=0,cardsToMatch=symbols.length/2,rant3stars=cardsToMatch+7,rant2stars=cardsToMatch+9,rant1stars=cardsToMatch+11;$restart.on("click",function(){swal({position:"center",title:"亲，确定要退出么？",text:"你的记忆会丢失哦！",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"不，哥从头再来"}).then(function(e){e.value&&(swal("重新开始了","Good Good Study Day Day Up","success"),clearInterval(timer),initGame())})}),$deck.on("click",'.card:not(".match, .open")',function(){var e=$(this),t=e.context.innerHTML;if(e.addClass("open show"),opened.push(t),console.log(opened),opened.length>1&&(t==opened[0]?($deck.find(".open").addClass("match flipInX"),setTimeout(function(){$deck.find(".match").removeClass("open show flipInX")},delay),match++):($deck.find(".open").addClass("notmatch wobble"),setTimeout(function(){$deck.find(".open").removeClass("open show notmatch wobble")},delay)),opened=[],moves++,ratingStars(moves),$movesNumber.html(moves)),match===cardsToMatch){ratingStars(moves);var a=ratingStars(moves).score;setTimeout(function(){endGame(moves,a)},500)}});