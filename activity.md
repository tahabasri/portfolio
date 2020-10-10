---
layout: main
title: Taha BASRI | Activities
---

{% for item in site.data.activities.activities %}
<div class="activities-container">
	<div class="activity">
		<div class="activity-preview {{ item.type | downcase }}">
			<h6>{{ item.type }}</h6>
			<h4>{{ item.title }}</h4>
		</div>
		<div class="activity-info">
			<h5>{{ item.description }}</h5>
            <a target="_blank" href="{{ item.link }}" type="button" class="btn">Read more</a>
		</div>
	</div>
</div>
{% endfor %}