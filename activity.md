---
layout: main
title: Taha BASRI · Activities
---

<div class="jumbotron jumbotron-fluid my-0">
  <div class="container text-white">
    <h1 class="display-3">Activities</h1>
  </div>
</div>

{% assign styles = site.data.activities.styles %}

{% for item in site.data.activities.activities %}
    {% assign remainder = forloop.index0 | modulo: 2 %}
	{% if remainder == 0 %}
<div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
    {% endif %}
<div class="{{ styles[item.type].bg }} mr-md-3 pt-3 pb-0 md-5 px-md-4 text-center {{ styles[item.type].text }} overflow-hidden">
    <div class="my-3 py-3">
      <p class="display-6 mb-0">{{ item.title }}</p>
      <h2 class="display-5">{{ item.title }}</h2>
      <p class="lead">{{ item.description }}</p>
      <a target="_blank" href="{{ item.link }}" class="btn {{ styles[item.type].button }}">Go to the {{ item.type | downcase }}</a>
    </div>
    <div class="bg-light shadow-sm mx-auto post" style="background-image: url('{{ item.img }}');"></div>
</div>
	{% if remainder != 0 %}
</div>
    {% endif %}
{% endfor %}