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
	var left = Number.MAX_VALUE;
	spinner.width(30);
	var done;
	var short_break;
	var timer;
	var title = $('title').text();
	var spinner = $('#spinner').spinner();
	var audio = new Audio('js/alarm.wav');
	var changeTitle = true;
	init();
	$('#default').on('change', function() {
		  if ( $('#default').is(':checked') ) {
		    left = Number.MAX_VALUE;
		    order = ["short_break", "pomodoro", "short_break", "pomodoro", "short_break", "pomodoro", "long_break"];
		    updateUpcoming();
		  } else {
		    left = 0;
		    order = [];
		  }
	});

	function init() {
	  	order = ["short_break", "pomodoro", "short_break", "pomodoro", "short_break", "pomodoro", "long_break", "pomodoro"];
	    done = order;
	    updateUpcoming();
	}

	var longbreaktime = 15;
	var shortbreaktime = 5;

	$('#longbreaktime').on('change', function() {
		longbreaktime = $(this).val();
	});

	$('#shortbreaktime').on('change', function() {
		shortbreaktime = $(this).val()
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

	$('#default').on('click', function() {
		order = ['short_break', 'pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'long_break', 'pomodoro'];
		done = order;
		updateUpcoming();
	});

	$('#easy').on('click', function() {
		order = ['short_break', 'pomodoro', 'long_break', 'pomodoro'];
		done = order;
		updateUpcoming();
	});

	$('#hard').on('click', function() {
		order = ['short_break', 'pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'long_break', 'pomodoro'];
		done = order;
		updateUpcoming();
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
					console.log("End");
					console.log(order);
					finish();
					return;
				} else {
					$('#current').text("Currently on: Nothing");
					document.title = "Pomodoro Timer";
				}	
				break;
		}		
		order = order.slice(1);
		console.log(order);
		updateUpcoming();
		$('#sortable li').first().remove();
		$('#timerlist').text(order);
	}

	function newPomodoro() {
		changeTitle = false;
		document.title = "New Pomodoro";
		setTimeout(function() {
			changeTitle = true;
		}, 5000);
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
				if(changeTitle) { 
					document.title = mins + ":" + secs + ' - ' + title;
				}
	       		$('.timer h1').text(mins + ":" + secs);
	    	}
		});
	}

	function newShortBreak() {
		changeTitle = false;
		document.title = "New Short Break";
		setTimeout(function() {
			changeTitle = true;
		}, 5000);
		$('#begin').hide();
		$(".timer h1").countdown({
				autostart: true,
				s:shortbreaktime,
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
				if(changeTitle) { 
					document.title = mins + ":" + secs + ' - ' + title;
				}
		       		$('.timer h1').text(mins + ":" + secs);
		    	}
		});
	}

	function newLongBreak() {
		changeTitle = false;
		document.title = "New Long Break";
		setTimeout(function() {
			changeTitle = true;
		}, 5000);
		$('#begin').hide();
		$(".timer h1").countdown({
				autostart: true,
				s:longbreaktime,
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
				if(changeTitle) { 
					document.title = mins + ":" + secs + ' - ' + title;
				}
		       		$('.timer h1').text(mins + ":" + secs);
		    	}
		});
	}

	$('#current').text("Currently on: Nothing");
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