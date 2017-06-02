
$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#sidebar-wrapper").toggleClass("toggled");
	google.maps.event.trigger(map, 'resize');

});

$("#MyCar-menu").click(function(e) {
	e.preventDefault();
	sendontop("MyCar-div");
});

$("#BreakDown-menu").click(function(e) {
	e.preventDefault();
	sendontop("breakDown-div");
});


$("#My-Insurance-menu").click(function(e) {
	e.preventDefault();
	sendontop("My-Insurance-div");
});


$("#Service-Book-contact-menu").click(function(e) {
	e.preventDefault();
	sendontop("Service-Book-div");
});

$("#BreakDownHistory-contact-menu").click(function(e) {
	e.preventDefault();
	sendontop("BreakDownHistory-div");
});



var my_index = 10000; // global var on page
function sendontop(div_id) {
	div_id = document.getElementById(div_id);
	div_id.style.zIndex = my_index++;
	div_id.style.marginLeft = "-256px";
}

$("#prevs-mnu-MyCar")
		.click(
				function(e) {
					e.preventDefault();
					var prevsDivId = e.target.parentElement.parentElement.parentElement.parentElement.id
					var divElement = document.getElementById(prevsDivId);
					divElement.style.marginLeft = "-512px";

				});

$("#prevs-mnu-brkdwn")
		.click(
				function(e) {
					e.preventDefault();
					var prevsDivId = e.target.parentElement.parentElement.parentElement.parentElement.id
					var divElement = document.getElementById(prevsDivId);
					divElement.style.marginLeft = "-512px";

				});


$("#prevs-mnu-My-Insurance")
.click(
		function(e) {
			e.preventDefault();
			var prevsDivId = e.target.parentElement.parentElement.parentElement.parentElement.id
			var divElement = document.getElementById(prevsDivId);
			divElement.style.marginLeft = "-512px";

		});




$("#prevs-mnu-Service-Book")
.click(
		function(e) {
			e.preventDefault();
			var prevsDivId = e.target.parentElement.parentElement.parentElement.parentElement.id
			var divElement = document.getElementById(prevsDivId);
			divElement.style.marginLeft = "-512px";

		});

$("#prevs-mnu-BreakDownHistory")
.click(
		function(e) {
			e.preventDefault();
			var prevsDivId = e.target.parentElement.parentElement.parentElement.parentElement.id
			var divElement = document.getElementById(prevsDivId);
			divElement.style.marginLeft = "-512px";

		});






$('#drive-time-radio-btn').click(function() {
	if ($(this).is(':checked')) {

		$('#buffer-radio-btn')[0].checked = false;
	}
});

$('#buffer-radio-btn').click(function() {
	if ($(this).is(':checked')) {

		$('#drive-time-radio-btn')[0].checked = false;

	}
});