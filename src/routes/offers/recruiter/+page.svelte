<script lang="ts">
	import { goto } from '$app/navigation';
	import RecruiterDetail, { getRecruiterOffer } from '$lib/components/RecruiterDetail.svelte';
	import Apply from '$lib/components/Apply.svelte';
	import { currentLocale } from '$lib/nav/stores';

	const offer = $derived.by(() => {
		$currentLocale;
		return getRecruiterOffer();
	});

	const onBack = () => {
		goto('/');
	};
</script>

<RecruiterDetail {onBack} />

<Apply {offer} />
