<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Bootstrap_Theme
 */

get_header('sidebar');
// Set the Current Author Variable $current_author
$current_author = (isset($_GET['author_name'])) ? get_user_by('slug', $author_name) : get_userdata(intval($author));
?>
<div class="main-content-holder container">
  <div class="author-card-holder">
    <h2>About <?php echo $current_author->display_name; ?>
    </h2>
    <div class="author-photo">
      <?php echo get_avatar($current_author->user_email, '100 '); ?>
    </div>
    <div class="author-info">
      <p>
        <strong>URL:</strong>
        <a href="<?php echo $current_author->user_url; ?>"><?php echo $current_author->user_url; ?></a><br />
        <strong>Bio:</strong> <?php echo $current_author->user_description; ?>
      </p>
      <p>
        <strong>Follow me on social media:</strong></br>
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
        <a href="#">Linkedin</a>
      </p>
    </div>
  </div>
  <div class="author-articles-holder">
    <h2 class="articles-title">All posts by <?php echo $current_author->first_name; ?>
    </h2>
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <article class="post">
      <h3>
        <a href="<?php the_permalink() ?>" rel="bookmark"
          title="Article link: <?php the_title(); ?>">
          <?php the_title(); ?>
        </a>
      </h3>
      <p class="publish-date">Published on: <?php the_time('d m Y'); ?>
      </p>
      <div class="post-category">
        <?php the_category(', '); ?>
      </div>
      <?php the_excerpt(); ?>
    </article>
    <?php endwhile;
// Previous/next page navigation.
the_posts_pagination();
else: ?>
    <p><?php esc_html_e('The author has no published posts.', 'textdomain'); ?>
    </p>
    <?php endif; ?>
  </div>
</div>
<?php get_sidebar();
get_footer('sidebar');
