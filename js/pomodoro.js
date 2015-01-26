// function for updating the text that shows what is coming up. outside the document scope for some reason...

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
	var left = Number.MAX_VALUE; // number of remaining repeats
	var done; 
	var short_break;
	var timer;
	var title = $('title').text(); // stores the current title so we can concatenate to it
	var audio = new Audio('js/alarm.wav'); // load in the alarm noise
	var longbreaktime = 15; // default time for a long break
	var shortbreaktime = 5; // default time for a short break
	var breakSuggestions = ['have a cup of tea', 'go for a walk', 'meditate'];
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

	// $('#longbreaktime').on('change', function() {
	// 	longbreaktime = $(this).val();
	// });

	// $('#shortbreaktime').on('change', function() {
	// 	shortbreaktime = $(this).val()
	// });

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
		console.log(breakSuggestions[Math.floor(Math.random() * breakSuggestions.length)]);
		$('#break_tip').html('Why not ' + breakSuggestions[Math.floor(Math.random() * breakSuggestions.length)] + '?');
		$('#break_tip').addClass('load');
		$(".timer h1").countdown({
				autostart: true,
				s:shortbreaktime,
		    	done: function() {
		    		finish();
		    		$('#break_tip').removeClass('load');
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