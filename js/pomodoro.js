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
	var audio = new Audio('js/alarm.wav');

	if($('#default').prop('checked')) {
		
	}

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

	function finish() {
		$('.timer h1').remove();
		$('.timer').prepend('<h1 id="timer"></h1>');
		audio.play();
		$('#begin').show();
		if(order.length === 0) {
			$('.timer h1').text("25:00");
		}
		switch(order[0]) {
			case 'pomodoro':
				$('#current').text("Currently on: Pomodoro");
				newPomodoro();
				break;
			case 'short_break':
				$('#current').text("Currently on: Short Break");
				newShortBreak();
				break;
			case 'long_break':
				$('#current').text("Currently on: Long Break");
				newLongBreak();
				break;
			default:
				if(left > 0) {
					left--;
					order = done;
				}
				$('#current').text("Currently on: Nothing");
				document.title = "Pomodoro Timer";
				break;
		}		
		done = order;
		order = order.slice(1);
		updateUpcoming();
		$('#sortable li').first().remove();
		$('#timerlist').text(order);
	}

	function newPomodoro() {
		$(".timer h1").countdown({
			autostart: true,
			s:25,
	    	done: function() {
	    		finish();
	    	},
			tpl: function(el,opts) {
				console.log("pomodoro");
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
	}

	function newShortBreak() {
		$(".timer h1").countdown({
				autostart: true,
				s:5,
		    	done: function() {
		    		finish();
		    	},
				tpl: function(el,opts) {
					console.log("short");
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
	}

	function newLongBreak() {
		$(".timer h1").countdown({
				autostart: true,
				s:15,
		    	done: function() {
    				finish();
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
	}

	$('#current').text("Currently on: Pomodoro");
	$(".timer h1").countdown({
		autostart: false,
		s:25,
    	done: function() {
    		finish();
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
});