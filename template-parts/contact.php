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
    <div class="form-group">
      <label for="formName">Name</label>
      <input type="text" class="form-control" id="formName" aria-describedby="" placeholder="Enter your Name" />
    </div>
    <div class="form-group">
      <label for="formEmail">Email</label>
      <input type="email" class="form-control" id="formEmail" placeholder="Enter your email address" />
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Your message</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</section>