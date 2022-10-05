<?php
/**
 *
 * Alt header that uses js to create mobile menus and dropdowns
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Bootstrap_Theme
 */
?>

<!-- This section is necessary for waypoints to work properly -->
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
    <nav id="nav" class="<?php echo esc_html($nav_classes); ?>">
      <div class="nav-con">

        <a href="<?php echo esc_url(site_url('/')); ?>"
          title="<?php echo esc_attr(get_bloginfo('name')); ?>"
          rel="home">
          <?php get_template_part('template-parts/content', 'custom-logo'); ?>
        </a>
        <div id="" class="nav-menu-wrapper">
          <?php
		wp_nav_menu([
			'theme_location' => 'menu-1',
			'depth' => 2,
			'container' => '',
			'container_class' => '',
			'container_id' => '',
			'menu_class' => 'nav-menu',
			'fallback_cb' => 'WP_Bootstrap_Navwalker::fallback',
			'walker' => new WP_Bootstrap_Navwalker(),
		]);
		?>
          <div class="search-button-left d-none d-lg-flex">
            <?php get_search_form() ?>
            <button
              class="btn btn-outline-primary align-self-end nav-btn ml-3 my-2 my-sm-0 nav-link text-white text-nowrap">
              <span><i class="fas fa-play mr-1"></i></span>
              PLAY
            </button>
          </div>

          <!-- If using a mobile sticky footer, include footer menu items here -->
          <!-- <div class="nav-item d-lg-none">
            <a class="nav-link pl-0 text-white" href="#">Privacy Policy</a>
          </div>
          <div class="search-button-right d-block d-lg-none">
            <button class="btn btn-outline-primary ml-0 my-2 my-sm-0 nav-link text-white">
              <span><i class="fas fa-play"></i></span>
              PLAY
            </button>
            <?php get_search_form() ?>
        </div> -->
      </div><!-- .nav-menu-wrapper -->
      <div class="hamburger">
        <div class="burger-line"></div>
        <div class="burger-line"></div>
        <div class="burger-line"></div>
      </div>
  </div><!-- .con-nav -->
  <div class="mobile-menu"></div>
  </nav>