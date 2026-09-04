<script lang="ts">
	import { internal } from '$lib/nav/internal';
	import { onMount } from 'svelte';
	import Catalog from '$lib/components/Catalog.svelte';
	import Detail from '$lib/components/Detail.svelte';
	import Apply from '$lib/components/Apply.svelte';
	import { view } from '$lib/nav/stores';

	let offers = $state<SavedOffer[]>([]);
	let selectedOfferId = $state<string | null>(null);

	const loadOffers = async () => {
		const response = await internal.getApi();
		if (response.offers) {
			offers = response.offers;
		}
	};

	let selectedOffer = $derived(offers.find((o) => o.id === selectedOfferId) ?? null);

	function selectOffer(id: string) {
		selectedOfferId = id;
		$view = 'detail';
	}

	onMount(loadOffers);
</script>

<svelte:head></svelte:head>

<div class="screens">
	<section class="screen" id="catalog">
		<Catalog {offers} onSelectOffer={selectOffer} />
	</section>

	<section class="screen" id="detail">
		{#if selectedOffer}
			<Detail offer={selectedOffer} onBack={() => ($view = 'catalog')} />
		{/if}
	</section>
</div>

<Apply
	offer={selectedOffer}
	onSuccessClose={() => {
		$view = 'catalog';
	}}
/>
