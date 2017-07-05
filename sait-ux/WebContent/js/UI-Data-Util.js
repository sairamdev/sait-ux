
	//var output = Mustache.render(template, person);
	//$("#modalDiv").html(output);
	
	
	function initCarDetails()
{
	var carDetailsTemplate = document.getElementById("CarInputData").innerHTML;
	var rendered = Mustache.render(carDetailsTemplate, carAttributes);
    $('#AddCarDetailsDiv').html(rendered);	
}
