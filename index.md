---
layout: main
title: Taha BASRI · Portfolio
---

<div class="banner-bg position-relative overflow-hidden p-3 p-md-5 text-center bg-light">
  <div class="col-md-9 p-lg-2 mx-auto my-2">
    <p><img class="profil" src="rsc/profil.jpg" alt="Me, when I am prepared for a picture"/></p>
    <h1 class="display-4 font-weight-normal text-light">Taha BASRI</h1>
    <p class="lead font-weight-normal text-light">
      Software engineer, experienced in mostly all phases of software development process.
      <br/>Very comfortable working with : Java, Spring, Microservices, CLIs, automation, and many more.</p>
    <a class="btn btn-dark text-success" href="#activitiesSection">What do I do ?</a>
  </div>
  <!-- scroll here above the Activities because the sticky navbar cuts the view -->
  <div id="activitiesSection"></div>
</div>

<div class="jumbotron jumbotron-fluid my-0">
  <div class="container text-white">
    <h1 class="display-3">Activities</h1>
    <div class="container">
      <div class="row">
        <p class="lead m-0 mr-2 text-success">Check some of my projects.</p>
        <a href="activity" class="btn btn-primary">or view all projects</a>
      </div>
    </div>
  </div>
</div>

{% assign posts = site.data.activities.activities %}

<div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
  <div class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-4 text-center text-white overflow-hidden">
    <div class="my-3 py-3">
      <p class="display-6 mb-0">{{ posts[0].type }}</p>
      <h2 class="display-5">{{ posts[0].title }}</h2>
      <p class="lead">{{ posts[0].description }}</p>
      <a target="_blank" href="{{ posts[0].link }}" class="btn btn-primary">Go to the {{ posts[0].type | downcase }}</a>
    </div>
    <div class="bg-light shadow-sm mx-auto post" style="background-image: url('{{ posts[0].img }}');"></div>
  </div>
  <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
    <div class="my-3 p-3">
      <p class="display-6 mb-0">{{ posts[1].type }}</p>
      <h2 class="display-5">{{ posts[1].title }}</h2>
      <p class="lead">{{ posts[1].description }}</p>
      <a target="_blank" href="{{ posts[1].link }}" class="btn btn-primary">Go to the {{ posts[1].type | downcase }}</a>
    </div>
    <div class="bg-dark shadow-sm mx-auto post" style="background-image: url('{{ posts[1].img }}');"></div>
  </div>
</div>

<div class="jumbotron jumbotron-fluid mt-0 mb-3">
  <div class="container text-white">
    <h1 class="display-3">Awards</h1>
    <p class="lead text-success">Take someone's word for it.</p>
  </div>
</div>

<div class="container">
  <div class="card-deck">
    <div class="card border-success bg-dark text-white">
      <div class="card-body">
        <h5 class="card-title">Best Business Model</h5>
        <span class="badge badge-primary">Faculty of Sciences Dhar El Mahraz</span>
        <p class="card-text">Best Business Model : Digital Platform for Events organization.</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Jan. 2018</small>
      </div>
    </div>
    <div class="card border-success bg-dark text-white">
      <div class="card-body">
        <h5 class="card-title">Top Talent "Juni'Or"</h5>
        <span class="badge badge-danger">CGI Morocco</span>
        <p class="card-text"></p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Oct. 2018</small>
      </div>
    </div>
    <div class="card border-success bg-dark text-white">
      <div class="card-body">
        <h5 class="card-title">Award of Excellence</h5>
        <span class="badge badge-primary">Faculty of Sciences Dhar El Mahraz</span>
        <p class="card-text">Award of excellence to the promotion major Taha BASRI.
          <dd>
            <li>Field: Software Quality (MQL).</li>
            <li>Diploma: Master.</li>
            <li>Promotion: 2016-2018</li>
          </dd></p>
      </div>
      <div class="card-footer">
        <small class="text-muted">Mar. 2019</small>
      </div>
    </div>
  </div>
</div>

<div class="container-lg my-3">
  <div id="recomCarousel" class="carousel slide" data-interval="10000" data-ride="carousel">
      <!-- Carousel indicators -->
      <ol class="carousel-indicators">
          <li data-target="#recomCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#recomCarousel" data-slide-to="1"></li>
          <li data-target="#recomCarousel" data-slide-to="2"></li>
      </ol>
      <!-- Wrapper for carousel items -->
      <div class="carousel-inner">
          <div class="carousel-item active">
              <div class="carousel-caption d-none d-md-block">
                <h5>Salma</h5>
                <i>"Taha is dynamic, very competent and above all has a good team spirit. I highly recommend him !"</i>
              </div>
          </div>
          <div class="carousel-item">
              <div class="carousel-caption d-none d-md-block">
                <h5>Amine</h5>
                <i>"I worked with Taha at CGI. I have very rarely worked with people with so many professional and human qualities ..."</i>
              </div>
          </div>
          <div class="carousel-item">
              <div class="carousel-caption d-none d-md-block">
                  <h5>Tarik</h5>
                  <i>"Taha is a gifted person in the IT field, something that drives him to develop his skills in the field day after day.
                    <br/>He has a team spirit, leadership."</i>
              </div>
          </div>
      </div>
      <!-- Carousel controls -->
      <a class="carousel-control-prev" href="#recomCarousel" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
      </a>
      <a class="carousel-control-next" href="#recomCarousel" data-slide="next">
          <span class="carousel-control-next-icon"></span>
      </a>
  </div>
</div>

<div class="jumbotron jumbotron-fluid mt-0 mb-3">
  <div class="container text-white">
    <h1 class="display-3">Get in touch</h1>
    <p class="lead text-success">Feel free to contact me for any technical consulting, event partnership or contribution.</p>
  </div>
</div>

<div id="contactSection" class="container">
  <div class="row">
    <div class="col-sm">
      <div class="card border-info mb-3" style="max-width: 18rem;">
        <div class="card-body text-info">
          <h5 class="card-title">LinkedIn <i class="fa fa-linkedin-square" aria-hidden="true"></i>
            <a  target="_blank" href="https://www.linkedin.com/in/tahabasri/en" class="badge badge-info">Taha BASRI</a></h5></div>
      </div>
    </div>
    <div class="col-sm">
      <div class="card border-dark mb-3" style="max-width: 18rem;">
        <div class="card-body text-dark">
          <h5 class="card-title">Github <i class="fa fa-github" aria-hidden="true"></i>
            <a  target="_blank" href="https://github.com/tahabasri" class="badge badge-dark">tahabasri</a></h5></div>
      </div>
    </div>
    <div class="col-sm">
      <div class="card border-primary mb-3" style="max-width: 18rem;">
        <div class="card-body text-primary">
          <h5 class="card-title">Twitter <i class="fa fa-twitter" aria-hidden="true"></i>
            <a  target="_blank" href="https://twitter.com/TheTahaBasri" class="badge badge-primary">@TheTahaBasri</a></h5></div>
      </div>
    </div>
  </div>
</div>