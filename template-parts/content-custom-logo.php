<?php
/**
 *
 * This template adds script for a custom logo to load
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Bootstrap_Theme
 */ ?>

<?php if (has_custom_logo()):  ?>
<?php // Get Custom Logo URL
$custom_logo_id = get_theme_mod('custom_logo');
$custom_logo_data = wp_get_attachment_image_src($custom_logo_id, 'full');
$custom_logo_url = $custom_logo_data[0]; ?>
<img class="" src="<?php echo esc_url($custom_logo_url); ?>"
  alt="<?php echo esc_attr(get_bloginfo('name')); ?>"
  width="30" height="30" />
<?php else: ?>
<div class="site-name"><?php bloginfo('name'); ?>
</div>
<?php endif;
