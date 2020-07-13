---
layout: main
title: Taha BASRI's activity
---

#### **Activity**
{% for item in site.data.activities.activities %}
<h5 style="margin-bottom: 0px;">{{ item.title }} ({{ item.type }})</h5>
{{ item.description }}
<a target="_blank" href="{{ item.link }}" type="button" class="button">Read more</a>
{% endfor %}