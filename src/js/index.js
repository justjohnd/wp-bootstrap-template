import ScrollOut from 'scroll-out';
import '../../node_modules/waypoints/lib/jquery.waypoints.min.js';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import bootstrap from 'bootstrap';

import './helpers/carousel-multi-image.js';
import './helpers/navbar.js';

//Set up ScrollOut module. This module makes elements appear on the screen when they come into view on scroll
ScrollOut({
  threshold: 0.2,
  once: true,
});

console.log('hi');
