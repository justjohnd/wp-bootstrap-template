<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Bootstrap_Theme
 */

get_template_part('template-parts/head');

// Variables for modifyin html based on which header is being used
$header_type = 'default';
set_query_var('header_type', $header_type);
get_template_part('template-parts/content-header-alt');
