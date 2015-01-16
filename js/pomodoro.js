var pomodoro = new Date();
pomodoro.setMinutes(pomodoro.getMinutes()+25);
var short_break;
var timer;
var title = $('title').text();

	pomodoro = new Date();
$('#current').text("Currently on: Pomodoro");
pomodoro.setMinutes(pomodoro.getMinutes()+25);
$('.timer h1').countdown(pomodoro, function(event) {
	document.title = event.strftime('%M:%S') + ' - ' + title;
	$(this).text(event.strftime('%M:%S'));
}).on('finish.countdown', function(event) {
	switch(order[0]) {
		case 'pomodoro':
			$('#current').text("Currently on: Pomodoro");
			timer = new Date();
			timer.setMinutes(timer.getMinutes()+25);
			break;
		case 'short_break':
			$('#current').text("Currently on: Short Break");
			timer = new Date();
			timer.setMinutes(timer.getMinutes()+5);
			break;
		case 'long_break':
			$('#current').text("Currently on: Long Break");
			timer = new Date();
			timer.setMinutes(timer.getMinutes()+15);
			break;
		default:
			$('#current').text("Currently on: Nothing");
			break;
	}
	order = order.slice(1);
	updateUpcoming();
	$('#sortable li').first().remove();
	$('#timerlist').text(order);
});
$('#timer').countdown('pause');
$('#begin').click(function(){
	$('#timer').countdown('resume');

});
$('#pause').click(function() {
	$('#timer').countdown('pause');
});
$('#resume').click(function() {
	$('#timer').countdown('resume');
});
function updateUpcoming() {
	var upcoming = "Upcoming: ";
	(order.length == 0) ? upcoming += "Nothing " : upcoming = upcoming;
	for (i = 0; i < order.length; i++) {
		switch(order[i]) {
			case 'pomodoro':
				upcoming += (i < order.length - 1) ? "Pomodoro, " : "Pomodoro ";
				break;
			case 'short_break':
				upcoming += (i < order.length - 1) ? "Short Break, " : "Short Break ";
				break;
			case 'long_break':
				upcoming += (i < order.length - 1) ? "Long Break, " : "Long Break ";
				break;
		}
	}
	$('#upcoming').text(upcoming);
}