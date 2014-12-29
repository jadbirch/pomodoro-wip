$(document).ready(function() {
	var item;
    var order;
    $( "#sortable" ).sortable({
        revert: true,
        beforeStop: function(event, ui) {
        	item = ui.item;
        },
        receive: function() {
        	switch($(item).text()) {
        		case 'Pomodoro':
        			$(item).attr("id", "pomodoro");
        			break;
        		case 'Short Break':
        			$(item).attr("id", "short_break");
        			break;
        		case 'Long Break':
        			$(item).attr("id", "long_break");
        			break;
        	}
        },
        update: function() {
            order = $('#sortable').sortable('toArray'); 
            $('#timerlist').text(order);
        }
    }).droppable({greedy:true});
    
    $( ".draggable" ).draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "invalid"
    });
    $('body').droppable({
        drop: function(event, ui) {
            if(ui.draggable.attr("id") != "no_delete") {
                ui.draggable.remove();
            }
        }
    });
    $( "ul, li" ).disableSelection();

    $('#begin').click(function() {

    });

});