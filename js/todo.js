$(document).ready(function() {
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

	$todoList = $('#todo-list');
	$('#new-todo').keypress(function(e) {
		if (e.which === 13) {
			$('.destroy').off('click');
			$('.toggle').off('click');
			var todos = $todoList.html();
			todos += ""+
			"<li>" +
			"<div class='view'>" +
			"<label data='' style='margin-right: 1em'>" + " " + $('#new-todo').val() + "</label>" +
			"<input class='toggle' type='checkbox'>" +
			"</div>" +
			"</li>";

			$(this).val('');
			$todoList.html(todos);
			strike();
			var oldCount = parseInt($('#pTotal').text());
			$('#pTotal').text(oldCount + 1);
		}
	}); // end keypress

	$('#add').click(function() {
		$('.destroy').off('click');
		$('.toggle').off('click');
		var todos = $todoList.html();
		todos += ""+
		"<li>" +
		"<div class='view'>" +
		"<label data='' style='margin-right: 1em'>" + " " + $('#new-todo').val() + "</label>" +
		"<input class='toggle' type='checkbox'>" +
		"</div>" +
		"</li>";

		$('#new-todo').val('');
		$todoList.html(todos);
		strike();
		$('#main').show();
		var oldCount = parseInt($('#pTotal').text());
		$('#pTotal').text(oldCount + 1);
	});
});

