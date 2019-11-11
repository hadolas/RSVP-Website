// Chevron Slide pulling up form
var scroll_container = document.querySelector(".scroll_container");
var heading_container = document.querySelector(".heading_container");
var chevron = document.querySelector(".chevron");
var responders_form = document.querySelector(".responders_form");

scroll_container.addEventListener("click", function(){
	heading_container.style.animation = "slideHeading 1s forwards";
	scroll_container.style.animation = "slideAndFadeChevron 1s forwards";
	chevron.style.animation = "slide paused";
	responders_form.style.display = "block";
	responders_form.style.animation = "showForm 2s forwards ease-out";
});

// Form's 'Next' button logic
var next = document.querySelector(".next");
var form_step = document.querySelectorAll(".form_step");
var form = document.querySelector("form");

// console.log(form_step);
// console.log(form);
form_step[1].style.display = "none";

form.addEventListener("click", function(){
	// console.log(event);
	if(event.target.type==="button") {
		form_step[0].style.display="none";
		form_step[1].style.display="block";	
	}
	
});

