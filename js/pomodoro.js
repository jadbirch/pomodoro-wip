var pomodoro = new Date();
pomodoro.getMinutes(pomodoro.getMinutes()+3);
var short_break;
var timer;
var title = $('title').text();

$('.timer h1').countdown(pomodoro, function(event) {
	document.title = event.strftime('%M:%S') + ' - ' + title;
	$(this).text(event.strftime('%M:%S'));
}).on('finish.countdown', function(event) {
	switch(order[0]) {
		case 'pomodoro':
			timer = new Date();
			timer.setMinutes(timer.getMinutes()+3);
			break;

		case 'short_break':
			timer = new Date();
			timer.setMinutes(timer.getMinutes()+1);
			break;

		case 'long_break':
			timer = new Date();
			timer.setMinutes(timer.getMinutes()+2);
			break;
	}

	$('.timer h1').countdown(timer, function(event){
		$(this.text(event.strftime('%M:%S')));
		order.shift();
	});
});

