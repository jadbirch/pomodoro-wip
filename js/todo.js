$(document).ready(function() {
	var todolist = [];
	var pTotal;
	var isChecked = [];
	init();
	function init() {
		pTotal = localStorage.getItem('pTotal');
		if (!pTotal) {
			pTotal = 0;
		}
		$('#pTotal').text(pTotal);
		var temptodolist = localStorage.getItem('todolist');
		var tempIsChecked = localStorage.getItem('isChecked');
		if (temptodolist === null || temptodolist.length === 0 || tempIsChecked === null || tempIsChecked.length === 0) {
			return;
		}
		todolist = JSON.parse(temptodolist);
		isChecked = JSON.parse(tempIsChecked);
		for (i = 0; i < todolist.length; i++) {
			if(todolist[i] === null) {
				continue;
			}
			var todos = $('#todo-list').html();
			todos += ""+
			"<li>" +
			"<div class='view'>" +
			"<input class='toggle' type='checkbox'>" +
			"<label data='' style='margin-left: 1em' id='" + i + "'>" + " " + todolist[i] + "</label>" +
			"</div>" +
			"</li>";
			$('.todo-modifier button').show();
			$('#todo-list').html(todos);
			if(isChecked[i]) {
				initStrike(i);
			}
		}
		strike();
	}

	function initStrike(id) {
		var $current = $('#' + id);
		$current.attr('data', 'done');
		$current.css('text-decoration', 'line-through');
		$current.css('opacity', '0.5');
		var oldCount = parseInt($('#pTotal').text());
		// $('#pTotal').text(oldCount - 1);
		var $chk = $current.closest('li').find('input');
		$chk.attr('checked', true);
		// localStorage.setItem('pTotal', oldCount - 1);		
	}

	function strike() {
		$('.toggle').on('click', function() {
			var $current = $(this).closest('li').find('label');
			if ( $current.attr('data') == 'done' ) {
				$current.attr('data', '');
				$current.css('text-decoration', 'none');
				$current.css('opacity', '1');
				var oldCount = parseInt($('#pTotal').text());
				$('#pTotal').text(oldCount + 1);
				isChecked[$current.attr('id')] = false;
				localStorage.setItem('isChecked', JSON.stringify(isChecked));
				localStorage.setItem('pTotal', oldCount + 1);
			}
			else {
				$current.attr('data', 'done');
				$current.css('text-decoration', 'line-through');
				$current.css('opacity', '0.5');
				var oldCount = parseInt($('#pTotal').text());
				$('#pTotal').text(oldCount - 1);
				isChecked[$current.attr('id')] = true;
				localStorage.setItem('isChecked', JSON.stringify(isChecked));
				localStorage.setItem('pTotal', oldCount - 1);
			}
		});
	}

	$('#clear').on('click', function() {
		$('#main').each(function() {
			$(this).find('label').each(function() {
				if ($(this).attr('data') == 'done') {
					var id = $(this).attr('id');
					todolist[id] = null;
					isChecked[id] = null;			
					$(this).parent().remove();
					localStorage.setItem('isChecked', JSON.stringify(isChecked));
					localStorage.setItem('todolist', JSON.stringify(todolist));
					console.log(localStorage);
					if(localStorage.getItem('pTotal') < 1) {	
						$('.todo-modifier button').hide();
					}
				}
			});
		});
	});

	$('#tick').on('click', function() {
		$('.toggle').each(function(){
			var closestLabel = $(this).next().attr("data");
			if(closestLabel !== "done") {
				$(this).click();
			}
		});
	});

	//add a new todo
	function addToDo() {
		var oldCount = parseInt($('#pTotal').text());
		var todos = $('#todo-list').html();
		var current = $('#new-todo').val().length;
		if(current > 0) {
			todos += ""+
			"<li>" +
			"<div class='view'>" +
			"<input class='toggle' type='checkbox'>" +
			"<label data='' style='margin-left: 1em' id='" + oldCount + "'>" + " " + $('#new-todo').val() + "</label>" +
			"</div>" +
			"</li>";
			todolist[oldCount] = ($('#new-todo').val());
			isChecked[oldCount] = (false);
			$('#new-todo').val('');
			$('#todo-list').html(todos);
			$('#pTotal').text(oldCount + 1);
			localStorage.setItem('pTotal', oldCount + 1);
			localStorage.setItem('todolist', JSON.stringify(todolist));
			localStorage.setItem('isChecked', JSON.stringify(isChecked));
			$('.todo-modifier button').show();
			strike();
		} else {
			$('#new-todo').focus();
		}
	}

	function tickAll() {

	}

	$('#new-todo').keypress(function(e) {
		if (e.which === 13) {
			addToDo();
		}
	}); // end keypress

	$('#add').click(function() {
		addToDo();
	});
});

