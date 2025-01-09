---
title: Changelog
permalink: /changelog/index.html
description: This site's changelog
subtitle: Chronological timeline of this site's changes
layout: page
type: default
---

{% for log in changelog.log %}
<div class="changelog-item">

### {{ log.date }}

<li class="changelog-tag" >${{ log.type }}</li>

{{ log.content | safe}}

</div>
{% endfor %}

