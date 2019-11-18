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
var send_rsvp_link = document.querySelector("#send_rsvp_link");
send_rsvp_link.addEventListener("click", function(){
    smoothScroll("#pass", 1500);
});
