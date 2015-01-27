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
	var pomodorosCompleted = 0;
	init();

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
		$('#upcoming').text(upcoming);
	}

	function clearBars() {

		$('.barz').empty();
	}

	var sum;
	function updateBars() {
		sum = 0;
		for (i = 0; i < done.length; i++) {
			switch(done[i]) {
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
		var pomodoroSize = 25/sum;
		var pomodoroWidth = pomodoroSize * $('.progress').width() + 'px';
		var shortBreakSize = 5/sum;
		var shortBreakWidth = shortBreakSize * $('.progress').width() + 'px';
		var longBreakSize = 15/sum;
		var longBreakWidth = longBreakSize * $('.progress').width() + 'px';
		for(i = 0; i < order.length; i++) {
			switch(order[i]) {
				case 'pomodoro':
					$('.barz').append("<div id='pomodoro_bar' data-original-title='Pomodoro' data-toggle='tooltip' class='progress-bar progress-bar-danger indiv_bars' style='width:"+pomodoroWidth+"' role='progressbar'></div>");
					break;
	  			case 'short_break':
	  				$('.barz').append("<div id='short_break_bar' data-original-title='Short Break' data-toggle='tooltip' data-toggle='tooltip' class='progress-bar progress-bar-success indiv_bars' style='width:"+shortBreakWidth+"' role='progressbar'></div>");
	  				break;
	  			case 'long_break':
	  				$('.barz').append("<div id='long_break_bar' data-original-title='Long Break' data-toggle='tooltip' class='progress-bar progress-bar-success indiv_bars' style='width:"+longBreakWidth+"' role='progressbar'></div>");
	  				break;
			}
		}
		$('[data-toggle="tooltip"]').tooltip({
        	placement : 'top',
        	container: 'body'
    	});
		widthBar = $('.progress').width();
		pixPerSec = widthBar / (sum);
	}

	function init() {
	  	order = ["pomodoro", "short_break", "pomodoro", "short_break", "pomodoro", "short_break", "pomodoro", "long_break"];
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
		order = ['pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'long_break'];
		done = order;
		updateUpcoming();
		clearBars();
		updateBars();
	});

	$('#easy').on('click', function() {
		order = ['pomodoro', 'short_break', 'pomodoro', 'long_break'];
		done = order;
		updateUpcoming();
		clearBars();
		updateBars();
	});

	$('#hard').on('click', function() {
		order = ['pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'short_break', 'pomodoro', 'long_break'];
		done = order;
		updateUpcoming();
		clearBars();
		updateBars();
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
	    		pomodorosCompleted++;
	    		$('#pomodoros_done').text("Pomodoros Completed: " + pomodorosCompleted);
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


	function moveTicker() {
		var current = $('#moving').css('left').replace(/[^-\d\.]/g, '');
		var shift = parseFloat(current) + parseFloat(pixPerSec);
		var totalWidth = $('.progress').width();
		// $('#moving').css('left', shift + 'px');
		$('#moving').css('-webkit-transition-duration', sum+'s').css('transform','translate('+totalWidth+'px,0px)');
	}
	$("#moving").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
		$(this).attr('style','');
		$(this).css('left','0');
		moveTicker();
	});


	updateBars();
	$('#begin').on("click", function() {
		$('#begin').hide();
		$('.buttons').attr("disabled","true");
		var first=true;
		var total;
		$('#current').text("Currently on: Nothing");
		$(".timer h1").countdown({
			autostart: true,
			s:25,
	    	done: function() {
	    		pomodorosCompleted++;
		    	$('#pomodoros_done').text("Pomodoros Completed: " + pomodorosCompleted);
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
		moveTicker();
		order = order.slice(1);
	});


	$('.bounce').on("click",function()
	{
		if(bounceClick)
		{
			 
			 $('#list').animate({left: '-20%'});
			 $('#right').animate({right: '0%'});
			 $('#trapBut').animate({left: '-9.3%'});
			 
			 $('.glyphicon').removeClass("glyphicon-chevron-down");
			 $('.glyphicon').addClass("glyphicon-chevron-up");


			bounceClick=false;
		}
		else
		{
			$('#list').animate({left: '0%'});
			$('#right').animate({right: '-10%'});
			$('#trapBut').animate({left: '10.7%'});
			
			 $('.glyphicon').removeClass("glyphicon-chevron-up");
			 $('.glyphicon').addClass("glyphicon-chevron-down");

			bounceClick=true;
		}
	});
});

