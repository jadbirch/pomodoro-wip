$(document).ready(function() {
	var todolist = [];
	var pTotal;
	var isChecked = [];
	init();
	function init() {
		var temptodolist = localStorage.getItem('todolist');
		var tempIsChecked = localStorage.getItem('isChecked');
		if (temptodolist === null || temptodolist.length === 0 || tempIsChecked === null || tempIsChecked.length === 0) {
			return;
		}
		todolist = JSON.parse(temptodolist);
		isChecked = JSON.parse(tempIsChecked);
		for (i = 0; i < todolist.length; i++) {
			var todos = $('#todo-list').html();
			todos += ""+
			"<li>" +
			"<div class='view'>" +
			"<input class='toggle' type='checkbox'>" +
			"<label data='' style='margin-left: 1em' id='" + i + "'>" + " " + todolist[i] + "</label>" +
			"</div>" +
			"</li>";
			$('#todo-list').html(todos);
			if(isChecked[i]) {
				initStrike(i);
			}
		}
		pTotal = localStorage.getItem('pTotal');
		if (!pTotal) {
			pTotal = 0;
		}
		$('#pTotal').text(pTotal);
	}

	function initStrike(id) {
		var $current = $('#' + id);
		$current.attr('data', 'done');
		$current.css('text-decoration', 'line-through');
		$current.css('opacity', '0.5');
		var oldCount = parseInt($('#pTotal').text());
		$('#pTotal').text(oldCount - 1);
		var $chk = $current.closest('li').find('checkbox');
		$chk.prop('checked', true);
	}

	$('.toggle').on('click', function() {
		alert("clicked");
		var $current = $(this).closest('li').find('label');
		if ( $current.attr('data') == 'done' ) {
			$current.attr('data', '');
			$current.css('text-decoration', 'none');
			$current.css('opacity', '1');
			var oldCount = parseInt($('#pTotal').text());
			$('#pTotal').text(oldCount + 1);
			isChecked[$current.attr('id')] = false;
			localStorage.setItem('isChecked', JSON.stringify(isChecked));
		}
		else {
			$current.attr('data', 'done');
			$current.css('text-decoration', 'line-through');
			$current.css('opacity', '0.5');
			var oldCount = parseInt($('#pTotal').text());
			$('#pTotal').text(oldCount - 1);
			isChecked[$current.attr('id')] = true;
			localStorage.setItem('isChecked', JSON.stringify(isChecked));
		}
	});

	function addToDo() {
		var oldCount = parseInt($('#pTotal').text());
		$('.destroy').off('click');
		$('.toggle').off('click');
		var todos = $('#todo-list').html();
		todos += ""+
		"<li>" +
		"<div class='view'>" +
		"<input class='toggle' type='checkbox'>" +
		"<label data='' style='margin-left: 1em' id='" + oldCount + "'>" + " " + $('#new-todo').val() + "</label>" +
		"</div>" +
		"</li>";
		todolist.push($('#new-todo').val());
		isChecked.push(false);
		$(this).val('');
		$('#todo-list').html(todos);
		$('#pTotal').text(oldCount + 1);
		localStorage.setItem('pTotal', oldCount + 1);
		localStorage.setItem('todolist', JSON.stringify(todolist));
		localStorage.setItem('isChecked', JSON.stringify(isChecked));
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

