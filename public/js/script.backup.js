/*
$(document).ready(function(){

	var counter = 0;
	var menus = [$("#menu1"),$("#menu2")];
	var nextButtons = $(".btn-next-menu");
	// var prevButtons = $(".btn-prev-menu");


	function activateMenu(activeIdx) {
		for (var i = 0, len = menus.length; i < len; i++) {
			if (i != activeIdx) {
				menus[i].addClass("none");
			} else {
				menus[i].removeClass("none");
			}
		}
	}

	activateMenu(counter);

	for (var i = 0, len = nextButtons.length; i < len; i++) {
		/!*prevButtons[i].addEventListener("click", function() {
			activateMenu(--counter);
		}, false);*!/

		nextButtons[i].addEventListener("click", function() {
			activateMenu(++counter);
		}, false);
	}

	$('#alertMe').click(function(e){
		
		e.preventDefault();
		
		$('#successAlert').slideDown();
	});
	
	$('a.pop').click(function(e){
		e.preventDefault();
	}).popover();
	
	$('[rel="tooltip"]').tooltip();
});*/
