<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Bootstrap_Theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta
		charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
	<!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.1/css/all.css"
		integrity="sha384-xxzQGERXS00kBmZW/6qxqJPyxW3UR0BPsL4c8ILaIWXva5kFi7TxkIIaMiKtqV1Q" crossorigin="anonymous"> -->

	<!-- Multiimage carousel. Note: currently doesn't work without CDN-->
	<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
		integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
	</script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous">
	</script>

</head>

<body <?php body_class(); ?>>
	<nav id="nav" class="navbar navbar-expand-lg navbar-light bg-transparent fixed-top" role="navigation">
		<!-- For transparent backgrounds: bg-transparent fixed-top -->
		<!-- Remove bg-transparent fixed-top and add bg-dark for solid backgrou	nd -->
		<div class="container">
			<!-- Brand and toggle get grouped for better mobile display -->
			<a class="navbar-brand" href="
				<?php echo esc_url(site_url('/')); ?>"
				title="<?php echo esc_attr(get_bloginfo('name')); ?>"
				rel="home">
				<?php get_template_part('template-parts/content', 'custom-logo'); ?>
			</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse"
				data-target="#bs-example-navbar-collapse-1" aria-controls="bs-example-navbar-collapse-1"
				aria-expanded="false"
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
