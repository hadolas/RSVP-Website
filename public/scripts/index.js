// Smooth Scroll
function smoothScroll(target, duration){
    // The target section
    var target = document.querySelector(target);
    // The Yth pixel of the target section (where the target section begins)
    var targetPosition = target.getBoundingClientRect().top + window.scrollY;
    // Current postition
    var startPosition = window.scrollY;
    // Total difference between target section and current position
    var distance = targetPosition - startPosition;
    var startTime = null;
    
    function animation(currentTime) {
        if(startTime === null){
            startTime = currentTime;
        }
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if(timeElapsed < duration){
            requestAnimationFrame(animation);
        }
    }
    
    // Easing function animation for scroll
    function ease(t, b, c, d) {
        t /= d;
    	return -c * t*(t-2) + b;
    };
  
    requestAnimationFrame(animation);
}

// When 'Send RSVP' link is clicked, scroll to passcode section
// var send_rsvp_link = document.querySelector("#send_rsvp_link");
// send_rsvp_link.addEventListener("click", function(){
//     smoothScroll("#pass", 1500);
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