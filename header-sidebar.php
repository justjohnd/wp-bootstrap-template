<?php
/**
 * This header is to be used with blog posts and other secondary pages. it uses the .site and .site-header classes to incorporate a right-hand sidebar
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Bootstrap_Theme
 */

get_template_part('template-parts/head');
?>

<body <?php body_class(); ?>>
  <div class="site">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-dark sticky-top site-header mb-4" role="navigation">
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
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0 nav-link text-white" type="submit">
                Search
              </button>
            </form>
            <button class="btn btn-outline-primary my-2 my-sm-0 nav-link text-white">
              OTHER BUTTON
            </button>
          </div>

          <div class="search-button-right d-block d-lg-none">
            <button class="btn btn-outline-primary my-2 my-sm-0 nav-link text-white">
              OTHER BUTTON
            </button>
            <form class="form-inline my-2 my-lg-0">
              <button class="btn btn-outline-success my-2 my-sm-0 nav-link text-white" type="submit">
                Search
              </button>
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
          </div>
        </div>
      </div>
    </nav>
