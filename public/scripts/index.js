// Chevron Slide pulling up form
// var scroll_container = document.querySelector(".scroll_container");
// var heading_container = document.querySelector(".heading_container");
// var chevron = document.querySelector(".chevron");
// var responders_form = document.querySelector(".responders_form");

// scroll_container.addEventListener("click", function(){
// 	heading_container.style.animation = "slideHeading 1s forwards";
// 	scroll_container.style.animation = "slideAndFadeChevron 1s forwards";
// 	chevron.style.animation = "slide paused";
// 	responders_form.style.display = "block";
// 	responders_form.style.animation = "showForm 2s forwards ease-out";
// });

// Form's 'Next' button logic AND Add Guest divs logic
// var form = document.querySelector("form");


// form.addEventListener("click", function(){

// });

// Logic for Guest Name Inputs
var radios_container = document.querySelector(".radios_container");
var guest_names_container = document.querySelector(".guest_names");
var indv_radio_container = document.querySelectorAll(".indv_radio_container");
var indv_guest_container = document.querySelectorAll(".indv_guest_container");

radios_container.addEventListener("click", function() {
	// If a radio button input in the radios_container is clicked...
	if(event.target.tagName==="INPUT"){
		var guests_attending = Number(event.target.value);

		// .. and more than one guest is attending...
		if(guests_attending!==0) {
			guest_names_container.style.display = "block";
		} else {
			guest_names_container.style.display = "none";
		}

		// .. then add an input for each guest attending
		for(var i=0; i<indv_guest_container.length; i++) {
			indv_guest_container[i].style.display= "block"
		
			if(guests_attending-1<i) {
				indv_guest_container[i].style.display= "none"
			}
		}
	}
});