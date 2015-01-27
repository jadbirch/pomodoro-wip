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
	var changeTitle = true;
	var widthBar;
	var pixPerSec;
	var bounceClick=true;

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

	$(window).resize(function() {
		clearBars();
		updateBars();
	});

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
		clearBars();
		updateBars();
		$('#upcoming').text(upcoming);
	}

	function clearBars() {

		$('.barz').empty();
	}

	function updateBars() {
		var sum = 0;
		for (i = 0; i < order.length; i++) {
			switch(order[i]) {
				case 'pomodoro':
					sum += 25;
					break;
				case 'short_break':
					sum += 5;
					break;
				case 'long_break':
					sum += 15;
					break;
			}
		}
		sum += 25;
		var pomodoroSize = 25/sum;
		var pomodoroWidth = pomodoroSize * $('.progress').width() + 'px';
		var shortBreakSize = 5/sum;
		var shortBreakWidth = shortBreakSize * $('.progress').width() + 'px';
		var longBreakSize = 15/sum;
		var longBreakWidth = longBreakSize * $('.progress').width() + 'px';
		$('.barz').append("<div id='indiv_bars' class='progress-bar progress-bar-danger' style='width:"+pomodoroWidth+"' role='progressbar'></div>");
		for(i = 0; i < order.length; i++) {
			switch(order[i]) {
				case 'pomodoro':
					$('.barz').append("<div id='indiv_bars' class='progress-bar progress-bar-danger' style='width:"+pomodoroWidth+"' role='progressbar'></div>");
	  				break;
	  			case 'short_break':
	  				$('.barz').append("<div id='indiv_bars' class='progress-bar progress-bar-info' style='width:"+shortBreakWidth+"' role='progressbar'></div>");
	  				break;
	  			case 'long_break':
	  				$('.barz').append("<div id='indiv_bars' class='progress-bar progress-bar-success' style='width:"+longBreakWidth+"' role='progressbar'></div>");
	  				break;
			}
		}
		widthBar = $('.progress').width();
		pixPerSec = widthBar / (sum);
	}

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
	var first=true;
	var total;
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
			moveTicker();
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

	function moveTicker() {
		var current = $('#moving').css('left').replace(/[^-\d\.]/g, '');
		var shift = parseFloat(current) + parseFloat(pixPerSec);
		$('#moving').css('left', shift + 'px');
		console.log(shift);
	}

	$('#begin').on("click", function() {
		$('#begin').hide();
		$('.timer h1').countdown("start");
	});


	$('#bounce').on("click",function()
	{
		var height = $("#right").height();
		var bounceHeight = height * 0.9 + 'px';

		if(bounceClick)
		{
			 //$('#hello').addClass("bounceInUp animated");

			 $('#bounceLayer').animate({bottom: '-10%'});
			 $('#bounceLayer').addClass("bounce animated");
			bounceClick=false;
		}
		else
		{
			$('#bounceLayer').animate({bottom: '-47%'});
			$('#bounceLayer').addClass("bounce animated");
			bounceClick=true;
		}
	
	$('#bounceLayer').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function()
	{
		$('#bounceLayer').removeClass("bounce animated");
	});
	});
});

