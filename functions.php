<?php
/**
 * Bootstrap Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Bootstrap_Theme
 */

if (!defined('_S_VERSION')) {
	// Replace the version number of the theme on each release.
	define('_S_VERSION', '1.0.0');
}

if (!function_exists('bootstrap_theme_setup')) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function bootstrap_theme_setup()
	{
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Bootstrap Theme, use a find and replace
		 * to change 'bootstrap-theme' to the name of your theme in all the template files.
		 */
		load_theme_textdomain('bootstrap-theme', get_template_directory() . '/languages');

		// Add default posts and comments RSS feed links to head.
		add_theme_support('automatic-feed-links');

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support('title-tag');

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support('post-thumbnails');

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			[
				'menu-1' => esc_html__('Primary', 'bootstrap-theme'),
			]
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			[
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			]
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'bootstrap_theme_custom_background_args',
				[
					'default-color' => 'ffffff',
					'default-image' => '',
				]
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support('customize-selective-refresh-widgets');

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			[
				'height' => 250,
				'width' => 250,
				'flex-width' => true,
				'flex-height' => true,
			]
		);
	}
endif;
add_action('after_setup_theme', 'bootstrap_theme_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function bootstrap_theme_content_width()
{
	$GLOBALS['content_width'] = apply_filters('bootstrap_theme_content_width', 640);
}
add_action('after_setup_theme', 'bootstrap_theme_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function bootstrap_theme_widgets_init()
{
	register_sidebar(
		[
			'name' => esc_html__('Sidebar', 'bootstrap-theme'),
			'id' => 'sidebar-1',
			'description' => esc_html__('Add widgets here.', 'bootstrap-theme'),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget' => '</section>',
			'before_title' => '<p class="widget-title font-weight-bold">',
			'after_title' => '</p>',
		]
	);
}
add_action('widgets_init', 'bootstrap_theme_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function bootstrap_theme_scripts()
{
	wp_enqueue_style('bootstrap-theme-stylesheet', get_template_directory_uri() . '/dist/css/style.css', [], '1.0.0', 'all');

	wp_style_add_data('bootstrap-theme-style', 'rtl', 'replace');

	wp_enqueue_script('bootstrap-theme-navigation', get_template_directory_uri() . '/dist/js/navigation.js', [], _S_VERSION, true);

	wp_enqueue_script('bootstrap-theme-bs-scripts', get_template_directory_uri() . '/dist/js/index.js', ['bootstrap'], '1.0.0', true);

	wp_enqueue_script('bootstrap-theme-index', get_template_directory_uri() . '/dist/js/index.js', [], _S_VERSION, true);

	if (is_singular() && comments_open() && get_option('thread_comments')) {
		wp_enqueue_script('comment-reply');
	}
}
add_action('wp_enqueue_scripts', 'bootstrap_theme_scripts');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Register Custom Navigation Walker
 */
function register_navwalker()
{
	require_once get_template_directory() . '/class-wp-bootstrap-navwalker.php';
}
add_action('after_setup_theme', 'register_navwalker');

//Function for adding images via acf
function acf_image($name, $classes = '')
{
	$image = get_field($name);
	if (!empty($image)): ?>

<img class="<?php echo esc_html($classes) ?>"
	src="<?php echo esc_url($image['url']); ?>"
	alt="<?php echo esc_attr($image['alt']); ?>" />

<?php
endif;
}

  // add default image setting to ACF image fields
  // let's you select a defualt image
  // this is simply taking advantage of a field setting that already exists -->
	add_action('acf/render_field_settings/type=image', 'add_default_value_to_image_field');
	function add_default_value_to_image_field($field)
	{
		acf_render_field_setting($field, [
			'label' => 'Default Image',
			'instructions' => 'Appears when creating a new post',
			'type' => 'image',
			'name' => 'default_value',
		]);
	}

// Console log php (for development and debugging). Just use console_log($var) in the function

function console_log($debug_output)
{
	$cleaned_string = '';
	if (!is_string($debug_output)) {
		$debug_output = print_r($debug_output, true);
	}

	$str_len = strlen($debug_output);
	for ($i = 0; $i < $str_len; $i++) {
		$cleaned_string .= '\\x' . sprintf('%02x', ord(substr($debug_output, $i, 1)));
	}
	$javascript_ouput = "<script>console.log('$cleaned_string');</script>";
	echo $javascript_ouput;
}

// Load WooCommerce compatibility file.
if (class_exists('WooCommerce')) {
	require get_template_directory() . '/inc/woocommerce.php';
}

/*
 * Function for post duplication. Dups appear as drafts. User is redirected to the edit screen
 */
function rd_duplicate_post_as_draft()
{
	global $wpdb;
	if (!(isset($_GET['post']) || isset($_POST['post']) || (isset($_REQUEST['action']) && 'rd_duplicate_post_as_draft' == $_REQUEST['action']))) {
		wp_die('No post to duplicate has been supplied!');
	}

	/*
	 * Nonce verification
	 */
	if (!isset($_GET['duplicate_nonce']) || !wp_verify_nonce($_GET['duplicate_nonce'], basename(__FILE__))) {
		return;
	}

	/*
	 * get the original post id
	 */
	$post_id = (isset($_GET['post']) ? absint($_GET['post']) : absint($_POST['post']));
	/*
	 * and all the original post data then
	 */
	$post = get_post($post_id);

	/*
	 * if you don't want current user to be the new post author,
	 * then change next couple of lines to this: $new_post_author = $post->post_author;
	 */
	$current_user = wp_get_current_user();
	$new_post_author = $current_user->ID;

	/*
	 * if post data exists, create the post duplicate
	 */
	if (isset($post) && $post != null) {
		/*
		 * new post data array
		 */
		$args = [
			'comment_status' => $post->comment_status,
			'ping_status' => $post->ping_status,
			'post_author' => $new_post_author,
			'post_content' => $post->post_content,
			'post_excerpt' => $post->post_excerpt,
			'post_name' => $post->post_name,
			'post_parent' => $post->post_parent,
			'post_password' => $post->post_password,
			'post_status' => 'draft',
			'post_title' => $post->post_title,
			'post_type' => $post->post_type,
			'to_ping' => $post->to_ping,
			'menu_order' => $post->menu_order
		];

		/*
		 * insert the post by wp_insert_post() function
		 */
		$new_post_id = wp_insert_post($args);

		/*
		 * get all current post terms ad set them to the new post draft
		 */
		$taxonomies = get_object_taxonomies($post->post_type); // returns array of taxonomy names for post type, ex array("category", "post_tag");
		foreach ($taxonomies as $taxonomy) {
			$post_terms = wp_get_object_terms($post_id, $taxonomy, ['fields' => 'slugs']);
			wp_set_object_terms($new_post_id, $post_terms, $taxonomy, false);
		}

		/*
		 * duplicate all post meta just in two SQL queries
		 */
		$post_meta_infos = $wpdb->get_results("SELECT meta_key, meta_value FROM $wpdb->postmeta WHERE post_id=$post_id");
		if (count($post_meta_infos) != 0) {
			$sql_query = "INSERT INTO $wpdb->postmeta (post_id, meta_key, meta_value) ";
			foreach ($post_meta_infos as $meta_info) {
				$meta_key = $meta_info->meta_key;
				if ($meta_key == '_wp_old_slug') {
					continue;
				}
				$meta_value = addslashes($meta_info->meta_value);
				$sql_query_sel[] = "SELECT $new_post_id, '$meta_key', '$meta_value'";
			}
			$sql_query .= implode(' UNION ALL ', $sql_query_sel);
			$wpdb->query($sql_query);
		}

		/*
		 * finally, redirect to the edit post screen for the new draft
		 */
		wp_redirect(admin_url('post.php?action=edit&post=' . $new_post_id));
		exit;
	} else {
		wp_die('Post creation failed, could not find original post: ' . $post_id);
	}
}
add_action('admin_action_rd_duplicate_post_as_draft', 'rd_duplicate_post_as_draft');

/*
 * Add the duplicate link to action list for post_row_actions
 */
function rd_duplicate_post_link($actions, $post)
{
	if (current_user_can('edit_posts')) {
		$actions['duplicate'] = '<a href="' . wp_nonce_url('admin.php?action=rd_duplicate_post_as_draft&post=' . $post->ID, basename(__FILE__), 'duplicate_nonce') . '" title="Duplicate this item" rel="permalink">Duplicate</a>';
	}

	return $actions;
}

add_filter('post_row_actions', 'rd_duplicate_post_link', 10, 2);
//This duplicates only posts. To duplicate pages, change the last line to: add_filter('page_row_actions', 'rd_duplicate_post_link', 10, 2);

//Change post default navigation
the_posts_navigation(
	[
		'prev_text' => __('Older posts', 'bootstrap_theme'),
		'next_text' => __('Newer posts', 'bootstrap_them'),
		'screen_reader_text' => __('Posts navigation', 'bootstrap_them')
	]
);
