<?php
/**
 *
 * This template adds a multi-image carousel section
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Bootstrap_Theme
 */
?>

<?php get_template_part('template-parts/acf-variables'); ?>

<!-- Multiple Image Carousel -->
<div class="top-content mb-5">
  <div class="container-fluid p-0">
    <div id="carousel-multi-image" class="carousel slide" data-ride="carousel" data-interval="5000">
      <div class="carousel-inner multi-image row w-100 mx-auto" role="listbox">
        <div class="
            multi-image
            carousel-item
            js-carousel-item
            col-12 p-0 col-sm-6 col-md-4 col-lg-3
            active
          ">
          <?php acf_image('image-1') ?>
        </div>
        <div class="
            multi-image
            carousel-item
            js-carousel-item
            col-12 p-0 col-sm-6 col-md-4 col-lg-3
          ">
          <?php acf_image('image-2') ?>
        </div>
        <div class="
            multi-image
            carousel-item
            js-carousel-item
            col-12 p-0 col-sm-6 col-md-4 col-lg-3
          ">
          <?php acf_image('image-3') ?>
        </div>
        <div class="
            multi-image
            carousel-item
            js-carousel-item
            col-12 p-0  col-sm-6 col-md-4 col-lg-3
          ">
          <?php acf_image('image-4') ?>
        </div>
        <div class="
            multi-image
            carousel-item
            js-carousel-item
            col-12 p-0 col-sm-6 col-md-4 col-lg-3
          ">
          <?php acf_image('image-5') ?>
        </div>
        <div class="
            multi-image
            carousel-item
            js-carousel-item
            col-12 p-0 col-sm-6 col-md-4 col-lg-3
          ">
          <?php acf_image('image-6') ?>
        </div>
        <div class="
            multi-image
            carousel-item
            js-carousel-item
            col-12 p-0 col-sm-6 col-md-4 col-lg-3
          ">
          <?php acf_image('image-7') ?>
        </div>
        <div class="
            multi-image
            carousel-item
            js-carousel-item
            col-12 p-0 col-sm-6 col-md-4 col-lg-3
          ">
          <?php acf_image('image-8') ?>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carousel-multi-image" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carousel-multi-image" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</div>
