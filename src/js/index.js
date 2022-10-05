import ScrollOut from 'scroll-out';
import '../../node_modules/waypoints/lib/jquery.waypoints.min.js';
// import bootstrap from 'bootstrap';

import './helpers/carousel-multi-image.js';
import './helpers/waypointsFunctions.js';
import './helpers/customNavbar.js';

//Set up ScrollOut module. This module makes elements appear on the screen when they come into view on scroll
ScrollOut({
  threshold: 0.2,
  once: true,
});
