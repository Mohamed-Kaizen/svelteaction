<script lang="ts">
	import { useToggle } from "@svelteaction/core"
	const [toggle, setToggle] = useToggle(false)
</script>

<h1>Welcome to SvelteKit {toggle}</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
