---
title: Changelog
permalink: /changelog/index.html
description: This site's changelog
layout: page
---

{% for log in changelog.log %}
### {{ log.date }}

__${{ log.type }}__

{{ log.content }}

<hr>
{% endfor %}

