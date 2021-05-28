<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Bootstrap_Theme
 */

get_header('sidebar');
?>
<main id="main" class="content-wrapper container">
	<?php if (have_posts()) {
	while (have_posts()) {
		the_post(); ?>

	<h1 class="page-title"><?php echo esc_html(get_the_title()); ?>
	</h1>
	<div class="page-section">
		<div class="page-content">
			<?php the_content(); ?>
		</div>
		<?php
	}
	wp_reset_postdata();
} ?>
	</div>
	<?php $paged = get_query_var('paged') ? get_query_var('paged') : 1;
$posts_query = new WP_Query(
	[
		'post_type' => 'post',
		'post_status' => 'publish',
		'posts_per_page' => 8,
		'paged' => $paged
	]
); ?>
	<div class="posts-section">
		<?php if ($posts_query->have_posts()) { ?>
		<h2><?php echo esc_html__('Our latest work', 'textdomain'); ?>
		</h2>
		<div class="archived-posts">
			<?php while ($posts_query->have_posts()) {
	$posts_query->the_post(); ?>
			<div class="archive-item">
				<?php if (has_post_thumbnail(get_the_ID())) { ?>
				<div class="post-thumbnail">
					<a href="<?php the_permalink(); ?>">
						<?php the_post_thumbnail(); ?>
					</a>
				</div>
				<?php } ?>
				<div class="post-title">
					<a href="<?php the_permalink(); ?>">
						<h3><?php the_title(); ?>
						</h3>
					</a>
				</div>
			</div>
			<?php
} ?>
		</div>
		<?php
$total_pages = $posts_query->max_num_pages;
if ($total_pages > 1) {
	$current_page = max(1, get_query_var('paged')); ?>
		<div class="archive-pagination">
			<?php echo paginate_links([
				'base' => get_pagenum_link(1) . '%_%',
				'format' => 'page/%#%',
				'current' => $current_page,
				'total' => $total_pages
			]); ?>
		</div>
		<?php
}
wp_reset_postdata();
} else { ?>
		<div class="archived-posts"><?php echo esc_html__('No posts matching the query were found.', 'textdomain'); ?>
		</div>
		<?php } ?>
	</div>
</main>
<?php
get_sidebar();
get_footer('sidebar');
