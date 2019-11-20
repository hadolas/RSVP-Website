// Logic for attending/not attending
var radios_container_attending = document.querySelector(".radios_container.attending");
var guest_number_container = document.querySelector(".guest_number_container");
var guest_number_inputs = document.querySelectorAll(".guest_number_inputs input[type=radio]");

// var guest_names_container = document.querySelector(".guest_names_container");
// var radios_container_guest_num = document.querySelector(".radios_container.guest_number_inputs");

radios_container_attending.addEventListener("click", function() {
	// If a radio button input for 'Attending?' is clicked...
	if(event.target.tagName==="INPUT") {
		var attending = event.target.value;

		// 
		// console.log(attending);
		if(attending==="yes"){
			guest_number_container.style.display = "block";
			
			
		} else {
			guest_number_container.style.display = "none";
			guest_names_container.style.display = "none";
			// console.log(event)
			// console.log(guest_number_inputs);
			for(var i=0; i<guest_number_inputs.length; i++) {
				// console.log(guest_number_inputs[i].checked);
				guest_number_inputs[i].checked = false;	
			}
		}
		
	}
});


// Logic for Guest Name Inputs
var radios_container_guest_num = document.querySelector(".radios_container.guest_number_inputs");
var guest_names_container = document.querySelector(".guest_names_container");
// var indv_radio_container = document.querySelectorAll(".indv_radio_container");
var indv_guest_container = document.querySelectorAll(".indv_guest_container");

radios_container_guest_num.addEventListener("click", function() {
	// If a radio button input for 'No. of guests attending' is clicked...
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
			// if 0 guests, then display no inputs
			if(guests_attending-1<i) {
				indv_guest_container[i].style.display= "none"
			}
		}
	}
});