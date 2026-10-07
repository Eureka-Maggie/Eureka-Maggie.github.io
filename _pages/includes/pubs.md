## Research & Publications
{: #publications }

### Selected First-Author Papers

{% assign selected_papers = site.data.publications | where: "group", "selected" %}
{% for paper in selected_papers %}
{% include publication.html paper=paper %}
{% endfor %}

### Collaborative Work

{% assign other_papers = site.data.publications | where: "group", "other" %}
{% for paper in other_papers %}
{% include publication.html paper=paper %}
{% endfor %}

<details class="earlier-publications">
  <summary>Earlier publication</summary>
  {% assign earlier_papers = site.data.publications | where: "group", "earlier" %}
  {% for paper in earlier_papers %}
  {% include publication.html paper=paper %}
  {% endfor %}
</details>
