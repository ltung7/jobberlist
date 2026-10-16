<script lang="ts">
	import { goto } from '$app/navigation';
	import RecruiterDetail from '$lib/components/RecruiterDetail.svelte';
	import Apply from '$lib/components/Apply.svelte';

	const onBack = () => {
		goto('/');
	};
</script>

<RecruiterDetail {onBack} />

<Apply offer={null} />
