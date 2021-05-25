<?php
/**
 *
 * General 7-section Bootstrap grid
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Bootstrap_Theme
 */
?>

<!-- Get the page name, then append it to the front of each field name parameter called by the acf_image function. This will associate an ACF field group with the specific page it is being used on -->
<?php
	$post = $wp_query->get_queried_object();
	$name = $post->post_name; //Retrieves post name (currently not be used).
  $template_path_array = explode('/', $_template_file);
  $template_filename = end($template_path_array);
  $template_name = substr($template_filename, 0, strlen($template_filename) - 4);
?>

<!-- BS Grid: 7 cells-->
<div id="js-navbar" class="container" data-scroll>
  <div class="row mb-4">
    <div class="col-md-8 mb-4 mb-md-0 px-2">
      <div class="border h-100">
        <!-- Note: border will need to be modified -->
        <div class="card">
          <img class="card-img-top" src="https://source.unsplash.com/user/fabriziochiagano/400x300" alt="Card
      image cap" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up
              the bulk of the card's content.
            </p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Cras justo odio</li>
          </ul>
          <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4 px-2">
      <div class="row">
        <div class="col-sm-6 col-md-12">
          <div class="mb-4">
            <div class="card">
              <img class="card-img-top" src="https://source.unsplash.com/user/fabriziochiagano/400x300" alt="Card
      image cap" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and
                  make up the bulk of the card's content.
                </p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
              </ul>
              <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-md-12">
          <div class="grid-container">
            <div class="card">
              <img class="card-img-top" src="https://source.unsplash.com/user/fabriziochiagano/400x300" alt="Card
      image cap" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and
                  make up the bulk of the card's content.
                </p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
              </ul>
              <div class="card-body">
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-12 col-md-6 col-lg-3 px-2">
      <div class="card">
        <img class="card-img-top" src="https://source.unsplash.com/user/fabriziochiagano/400x300" alt="Card
      image cap" />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up
            the bulk of the card's content.
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-3 px-2">
      <div class="card">
        <img class="card-img-top" src="https://source.unsplash.com/user/fabriziochiagano/400x300" alt="Card
      image cap" />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up
            the bulk of the card's content.
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-3 px-2">
      <div class="card">
        <img class="card-img-top" src="https://source.unsplash.com/user/fabriziochiagano/400x300" alt="Card
      image cap" />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up
            the bulk of the card's content.
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-3 px-2">
      <div class="card">
        <img class="card-img-top" src="https://source.unsplash.com/user/fabriziochiagano/400x300" alt="Card
      image cap" />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up
            the bulk of the card's content.
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
  </div>
</div>
