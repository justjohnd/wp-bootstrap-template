<?php
/**
 * This header is to be used with blog posts and other secondary pages. it uses the .site and .site-header classes to incorporate a right-hand sidebar
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Bootstrap_Theme
 */

get_template_part('template-parts/head');

// Variables for modifyin html based on which header is being used
$header_type = 'sidebar';

set_query_var('header_type', $header_type);
get_template_part('template-parts/content-header');
