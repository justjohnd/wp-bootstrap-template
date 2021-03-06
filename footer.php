<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Bootstrap_Theme
 */

?>

<!-- BS Footer -->
<footer id="colophon" class="site-footer">
	<div class="site-info">
		<!-- Mobile Sticky Footer. Note: if using this footer, move any footer links to the mobile menu -->
		<div class="d-sm-block d-md-none">
			<button class="btn btn-primary btn-full-width btn-block">
				STICKY FOOTER BUTTON
			</button>
		</div>

		<div class="bg-dark d-none d-md-block">
			<div class="mb-0 px-3">
				<div class="row py-2">
					<div class="col-sm-12 col-md-8">
						<div class="row">
							<div class="col-lg-12">
								<ul class="
                    mb-0
                    text-left
                    d-flex
                    justify-content-center justify-content-md-start
                  ">
									<li>
										<a href="" target="_blank" rel="noopener noreferrer">
											<i class="h4 fab fa-facebook-square mr-4"></i>
										</a>
									</li>
									<li>
										<a href="" target="_blank" rel="noopener noreferrer">
											<i class="h4 fab fa-instagram-square mr-4"></i>
										</a>
									</li>
									<li>
										<a href="" target="_blank" rel="noopener noreferrer">
											<i class="h4 fab fa-twitter-square"></i>
										</a>
									</li>
								</ul>
							</div>
							<div class="col-lg-12">
								<ul class="
                    font-weight-bold
                    mb-0
                    d-flex
                    justify-content-center justify-content-md-start
                  ">
									<li class="pl-0 mr-4">
										<a class="text-light" href="">TERMS OF USE</a>
									</li>
									<li class="">
										<a class="text-light mr-4" href="">PRIVACY POLICY</a>
									</li>
									<li class="">
										<a class="text-light" href="">CONTACT</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="
              text-white
              col-sm-12 col-md-4
              d-flex
              align-items-end
              justify-content-center justify-content-md-end
            ">
						<p class="mb-0">&copy; <?php echo date('Y'); ?>
							Company name</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</div> <!-- .site -->
</body>

</html>
