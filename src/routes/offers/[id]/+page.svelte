<script lang="ts">
	import { goto } from '$app/navigation';
	import Apply from '$lib/components/Apply.svelte';
	import Detail from '$lib/components/Detail.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const onBack = () => {
		goto('/');
	};
</script>

<Detail offer={data.offer} {onBack} />

<Apply offer={data.offer} />
