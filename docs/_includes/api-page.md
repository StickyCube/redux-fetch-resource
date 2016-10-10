
---

## Summary
{: .Heading }

{{include.api.summary}}

---

## Reference
{: .Heading }

{% for section in include.api.sections %}

### {{section.title}}
{: .Heading }

<br/>

---
{: .Rule--feint }

{% for subsection in section.subsections %}

### {{subsection.title}}
{: .Heading }

<br/>

{% for entry in subsection.entries %}

{% if entry.is_main %}
#### {{entry.title}}
{% else %}
##### {{entry.title}}
{% endif %}

{{entry.description}}

{% for point in entry.points %}
- {{point}}
{% endfor %}

{% if entry.example %}
{% include {{entry.example}} %}
{% endif %}

<br/>

{% endfor %}

{% endfor %}

{% endfor %}
