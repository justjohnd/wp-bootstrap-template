<?php
/**
 *
 * This template holds variables used to create field names, to be referenced by ACF and the get_field() function
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Bootstrap_Theme
 */
?>

<!-- Get the page name, then append it to the front of each field name parameter called by the acf_image function. This will associate an ACF field group with the specific page it is being used on -->
<?php
	$post = $wp_query->get_queried_object();
	$name = $post->post_name; //Retrieves post name (currently not be used).
  $template_path_array = explode('/', $_template_file);
  $template_filename = end($template_path_array);
  $template_name = substr($template_filename, 0, strlen($template_filename) - 4);
