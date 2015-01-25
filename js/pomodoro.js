function updateUpcoming(isDelete) {
	if(!isDelete) {
		done = order;
	}
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
	var left = Number.MAX_VALUE;
	spinner.width(30);
	var done;
	var short_break;
	var timer;
	var title = $('title').text();
	var spinner = $('#spinner').spinner();
	var audio = new Audio('js/alarm.wav');

	$('#default').on('change', function() {
		  if ( $('#default').is(':checked') ) {
		    left = Number.MAX_VALUE;
		    order = ["short_break", "pomodoro", "short_break", "pomodoro", "short_break", "pomodoro", "long_break"];
		    console.log(order);
		    updateUpcoming(false);
		  } else {
		    left = 0;
		    order = [];
		  }
	});

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
					console.log(order);
					finish();
				} else {
					$('#current').text("Currently on: Nothing");
					document.title = "Pomodoro Timer";
				}	
				break;
		}		
		order = order.slice(1);
		updateUpcoming(true);
		$('#sortable li').first().remove();
		$('#timerlist').text(order);
	}

	function newPomodoro() {
		$('#begin').hide();
		$(".timer h1").countdown({
			autostart: true,
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
	}

	function newShortBreak() {
		$('#begin').hide();
		$(".timer h1").countdown({
				autostart: true,
				s:5,
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

	function newLongBreak() {
		$('#begin').hide();
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

  	order = ["short_break", "pomodoro", "short_break", "pomodoro", "short_break", "pomodoro", "long_break", "pomodoro"];
    done = order;
    updateUpcoming(false);
	$('#current').text("Currently on: Pomodoro");
	$(".timer h1").countdown({
		autostart: false,
		s:5,
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