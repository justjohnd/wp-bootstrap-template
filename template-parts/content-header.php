<?php
/**
 *
 * Use this controls the header (not the head), of which there are several varieties. All headers with the exception of a few classes use the same structure. Variable classes are controlled by variables at the top of each individual header file.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Bootstrap_Theme
 */
?>

<?php
if ($header_type == 'default') :
	$nav_classes = 'bg-transparent fixed-top';
  $site_class = '';
elseif ($header_type == 'sidebar') :
	$nav_classes = 'bg-dark sticky-top';
  $site_class = 'site';
elseif ($header_type == 'solid') :
		$nav_classes = 'bg-dark sticky-top';
	$site_class = '';
endif;

?>

<body <?php body_class(); ?>>
  <div class="<?php echo esc_html($site_class); ?>">
    <nav id="nav"
      class="navbar navbar-expand-lg navbar-light site-header <?php echo esc_html($nav_classes); ?>"
      role="navigation">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <a class="navbar-brand" href="
				<?php echo esc_url(site_url('/')); ?>"
          title="<?php echo esc_attr(get_bloginfo('name')); ?>"
          rel="home">
          <?php get_template_part('template-parts/content', 'custom-logo'); ?>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
          aria-controls="bs-example-navbar-collapse-1" aria-expanded="false"
          aria-label="<?php esc_attr_e('Toggle navigation', 'your-theme-slug'); ?>">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="bs-example-navbar-collapse-1" class="collapse navbar-collapse">
          <?php
		wp_nav_menu([
			'theme_location' => 'menu-1',
			'depth' => 2,
			'container' => '',
			'container_class' => 'collapse navbar-collapse',
			'container_id' => 'bs-example-navbar-collapse-1',
			'menu_class' => 'nav navbar-nav mr-auto',
			'fallback_cb' => 'WP_Bootstrap_Navwalker::fallback',
			'walker' => new WP_Bootstrap_Navwalker(),
		]);
		?>
          <!-- If using a mobile sticky footer, include footer menu items here -->
          <div class="nav-item d-lg-none">
            <a class="nav-link pl-0 text-white" href="#">Privacy Policy</a>
          </div>
          <!-- Restyle buttons for mobile -->
          <div class="search-button-left d-none d-lg-flex">
            <?php get_search_form() ?>
            <button class="btn btn-outline-primary nav-btn ml-3 my-2 my-sm-0 nav-link text-white text-nowrap">
              <span><i class="fas fa-play mr-1"></i></span>
              PLAY
            </button>
          </div>

          <div class="search-button-right d-block d-lg-none">
            <button class="btn btn-outline-primary my-2 my-sm-0 nav-link text-white">
              <span><i class="fas fa-play"></i></span>
              PLAY
            </button>
            <?php get_search_form() ?>
          </div>
        </div>
      </div>
    </nav>
