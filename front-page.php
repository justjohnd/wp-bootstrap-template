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
  <?php get_template_part('template-parts/banner-carousel'); ?>

  <?php get_template_part('template-parts/carousel-multi-image'); ?>

  <?php get_template_part('template-parts/button-group'); ?>

  <?php get_template_part('template-parts/text'); ?>

  <?php get_template_part('template-parts/modal'); ?>

  <?php get_template_part('template-parts/grid-7'); ?>

  <?php get_template_part('template-parts/gallery-modal'); ?>

  <?php get_template_part('template-parts/accordian'); ?>

  <?php get_template_part('template-parts/contact'); ?>








</main>

<?php
get_footer();
