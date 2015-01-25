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
$(document).ready(function() {
	var spinner = $('#spinner').spinner();
	var left;
	spinner.width(30);
	var done;
	var short_break;
	var timer;
	var title = $('title').text();
	var spinner = $('#spinner').spinner();
	var audio = new Audio('js/alarm.mp3');

	$('#infinite').on('change', function() {
		  if ( spinner.spinner( "option", "disabled" ) ) {
		    spinner.spinner( "enable" );
		    left = 0;
		  } else {
		    spinner.spinner( "disable" );
		    left = Number.MAX_VALUE;
		  }
	});

	spinner.spinner("option", "min", 0);
	spinner.on("spin", function() {
		left = spinner.spinner("value") + 1;
	});

	$(".timer h1").countdown({
		autostart: false,
		s:10,
    	done: function() {
    		audio.play();
    	},
		tpl: function(el,opts) {
			var secs;
			var mins;
			if(opts.s < 10) {
				secs = "0" + opts.s;
			} else {
				secs = opts.s;
			}
			if(opts.m < 10) {
				mins = "0" + opts.m;
			} else {
				mins = opts.m;
			}
			document.title = mins + ":" + secs + ' - ' + title;
       		$('.timer h1').text(mins + ":" + secs);
    	}
	});

	$('#begin').on("click", function() {
		$('#begin').hide();
		$('.timer h1').countdown("start");
	});

/*
	$('.timer h1').countdown('pause');
	$('#begin').on('click', function(event) {
		$('#begin').hide();
		var now = new Date();
		pomodoro.setMinutes(now.getMinutes()+25);
		$('.timer h1').countdown("start");
	});
	/*
	$('.timer h1').on('finish.countdown', function(event) {
				audio.play();
				$('#begin').show();
				done = order;
				order = order.slice(1);
				updateUpcoming();
				$('#sortable li').first().remove();
				$('#timerlist').text(order);
				audio.play();
				switch(order[0]) {
					case 'pomodoro':
						$('#current').text("Currently on: Pomodoro");
						timer = new Date();
						timer.setMinutes(timer.getMinutes()+25);
						break;
					case 'short_break':
						$('#current').text("Currently on: Short Break");
						timer = new Date();
						timer.setSeconds(timer.getMinutes()+5);
						break;
					case 'long_break':
						$('#current').text("Currently on: Long Break");
						timer = new Date();
						timer.setSeconds(timer.getMinutes()+15);
						break;
					default:
						if(left > 0) {
							left--;
							order = done;
							//horrific fudge
							$('#current').text("Currently on: Pomodoro");
							timer = new Date();
							timer.setMinutes(timer.getMinutes()+25);
							break;
						}
						$('#current').text("Currently on: Nothing");
						$('.timer h1').text("25:00");
						document.title = "Pomodoro Timer";
						break;
				}
				$('.timer h1').countdown(timer, function(event){
					$(this).text(event.strftime('%M:%S'));
				});
			}); */
});