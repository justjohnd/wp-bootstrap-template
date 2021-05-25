<?php
/**
 * The main front-page file
 *
 * It is used to display the front-page.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Bootstrap_Theme
 */

get_header();
?>

<main id="primary" class="site-main">
  <?php get_template_part('template-parts/banner_carousel'); ?>

  <?php get_template_part('template-parts/grid_7'); ?>

  <?php get_template_part('template-parts/gallery-modal'); ?>

</main>

<?php
// get_sidebar();
get_footer();
