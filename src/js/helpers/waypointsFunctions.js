//This code is used with the waypoints package to change navbar on scroll past banner.
//Note: waypoint function must be wrapped in conditional, otherwise it will interfere with Scroll-out package

const jsNavbar = document.getElementById('js-navbar');
const nav = document.getElementById('nav');

if (jsNavbar) {
  const waypointNavbar = new Waypoint({
    element: jsNavbar,
    handler: function () {
      //Change navbar background color to bg-black, bg-white, etc.
      nav.classList.add('bg-black');
      nav.classList.remove('bg-transparent');


      let elements = document.getElementsByClassName('nav-link');
      for (let i = 0; i < elements.length; i++) {

        if (nav.classList.contains('bg-black'))
        { 
          elements[i].classList.add('text-white');
        } else if (nav.classList.contains('bg-white')) {
        elements[i].classList.add('text-dark');
        }
      }
    },
    offset: 200,
  });
}



