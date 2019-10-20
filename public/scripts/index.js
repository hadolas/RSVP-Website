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