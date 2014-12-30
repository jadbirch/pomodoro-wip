$(document).ready(function() {
	var todolist = [];
	var pTotal;
	init();
	function init() {
		var temptodolist = localStorage.getItem('todolist');
		if (temptodolist === null || temptodolist.length === 0) {
			return;
		}
		todolist = temptodolist;
		for (i = 0; i < todolist.length; i++) {
			var todos = $('#todo-list').html();
			todos += ""+
			"<li>" +
			"<div class='view'>" +
			"<input class='toggle' type='checkbox'>" +
			"<label data='' style='margin-left: 1em'>" + " " + todolist[i] + "</label>" +
			"</div>" +
			"</li>";
			$('#todo-list').html(todos);
			strike();
		}
		pTotal = localStorage.getItem('pTotal');
		if (!pTotal) {
			pTotal = 0;
		}
		$('#pTotal').text(pTotal);
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
			}
			else {
				$current.attr('data', 'done');
				$current.css('text-decoration', 'line-through');
				$current.css('opacity', '0.5');
				var oldCount = parseInt($('#pTotal').text());
				$('#pTotal').text(oldCount - 1);
			}
		});
	}

	function addToDo() {
		$('.destroy').off('click');
		$('.toggle').off('click');
		var todos = $('#todo-list').html();
		todos += ""+
		"<li>" +
		"<div class='view'>" +
		"<input class='toggle' type='checkbox'>" +
		"<label data='' style='margin-left: 1em'>" + " " + $('#new-todo').val() + "</label>" +
		"</div>" +
		"</li>";
		todolist.push($('#new-todo').val());
		$(this).val('');
		$('#todo-list').html(todos);
		strike();
		var oldCount = parseInt($('#pTotal').text());
		$('#pTotal').text(oldCount + 1);
		localStorage.setItem('pTotal', oldCount + 1);
		localStorage.setItem('todolist', todolist);
	}

	$('#new-todo').keypress(function(e) {
		if (e.which === 13) {
			addToDo();
		}
	}); // end keypress

	$('#add').click(function() {
		$('.destroy').off('click');
		$('.toggle').off('click');
		addToDo();
	});
});

