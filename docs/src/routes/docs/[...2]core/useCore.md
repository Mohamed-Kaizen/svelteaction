---
title: useCore
description: FFFFFFFFFFFFFFFA boolean switcher with utility functions.
category: Utilities
---

# {$frontmatter.title}

{$frontmatter.description}

<script>
    import Demo from "./_useCore.svelte";
</script>

## Demo

<div id="demobox" >
    <Demo/>
</div>

## Usage

```js
import { useToggle } from '@vueuse/core'

const [value, toggle] = useToggle()
```

When you pass a ref, `useToggle` will return a simple toggle function instead:

```js
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
```
