---
layout: main
title: Taha BASRI
---

![Me, when I am prepared for a picture](rsc/profil.png)

# Taha BASRI

#### Software Developer

> "I can help you search for a file on your computer, or build your very own file manager ... if that is your thing."

Taha BASRI is a software engineer at Oracle Labs, experienced in all phases of software development process.
Very comfortable working with : Java, Spring, Java EE technologies, Maven, Git, SQL, CI tools. 

#### [Resume](resume) | [LinkedIn](https://www.linkedin.com/in/tahabasri/en) | [Github](https://github.com/tahabasri) | [Mail](mailto:tahabsri@gmail.com)

#### **Activity**
{% for item in site.data.activities.activities %}
<h5 style="margin-bottom: 0px;">{{ item.title }} ({{ item.type }})</h5>
{{ item.description }}
<a target="_blank" href="{{ item.link }}" type="button" class="button">Read more</a>
{% endfor %}

---
Theme : [Air](https://github.com/markdowncss/air), or checkout my [custom version](https://github.com/tahabasri/portfolio).