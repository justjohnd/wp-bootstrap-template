<?php
/**
 *
 * This template adds script for a custom logo to load
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
?>

<!-- Bootstrap Banner -->
<div id="carousel-banner" class="carousel slide carousel-fade" data-ride="carousel" data-interval="2000">
  <ol class="carousel-indicators">
    <li data-target="#carousel-banner" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-banner" data-slide-to="1"></li>
    <li data-target="#carousel-banner" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item img-darken active">
      <?php acf_image($template_name . '_image1', 'img-slider') ?>
    </div>
    <div class="carousel-item img-darken">
      <?php acf_image($template_name . '_image2', 'img-slider') ?>
    </div>
    <div class="carousel-item img-darken">
      <?php acf_image($template_name . '_image3', 'img-slider') ?>
    </div>
    <div class="img-text">
      <h1 class="h1 text-center text-light fade-in">PAGE HEADING</h1>
      <h3 class="h3 text-center text-light">Subheading</h3>
      <div class="text-center">
        <button class="btn btn-primary btn-lg">LISTEN LIVE</button>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carousel-banner" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carousel-banner" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
