<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Bootstrap_Theme
 */

get_header('solid');
?>

<main id="primary" class="site-main">
	<section class="error-404 not-found">
		<div class="jumbotron jumbotron-fluid text-center">
			<header class="page-header">
				<h1 class="page-title display-4"><?php esc_html_e('404')?>
				</h1>
			</header><!-- .page-header -->
			<hr class="my-4">
			<h2><?php esc_html_e('Oops! This page can&rsquo;t be found.', 'bootstrap-theme'); ?>
			</h2>
			<div class="mb-3"><?php get_search_form(); ?>
			</div>
			<p><?php

the_widget(
	'WP_Widget_Recent_Posts',
	['title' => 'Recent Posts', 'number' => 5],
	['before_title' => '<h4 class="block-title"><span>', 'after_title' => '</span></h4>']
);
 ?>
			</p>

			<h4><small>
					<a href="#">HOME</a></small>
			</h4>
		</div>
	</section><!-- .error-404 -->
</main><!-- #main -->

<?php
get_footer();
