//This code is used with the waypoints package to change navbar on scroll past banner.
//Note: waypoint function must be wrapped in conditional, otherwise it will interfere with Scroll-out package
if (document.getElementById('js-navbar')) {
  const waypointNavbar = new Waypoint({
    element: document.getElementById('js-navbar'),
    handler: function () {
      document.getElementById('nav').classList.add('bg-white');
      document.getElementById('nav').classList.remove('bg-transparent');

      let elements = document.getElementsByClassName('nav-link'); // get all elements
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('text-white');
        elements[i].classList.add('text-dark');
      }
    },
    offset: 200, // Good offset if useing with default waypoints settings for next item
  });
}
