<?php
/**
 *
 * This template adds a contact section
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Bootstrap_Theme
 */
?>

<?php get_template_part('template-parts/acf-variables'); ?>

<!-- BS Contact Form -->
<section data-scroll class="container w-75">
  <h2 class="h2 text-center">CONTACT US</h2>
  <form>
    <?php echo do_shortcode(wp_kses_post('[contact-form-7 id="70" title="Email"]')) ?>
  </form>
</section>
