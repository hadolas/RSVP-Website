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