<script lang="ts">
	import { internal } from '$lib/nav/internal';
	import Toasts from '$lib/toast/Toasts.svelte';
	import { onMount } from 'svelte';
	import Catalog from '$lib/components/Catalog.svelte';
	import Detail from '$lib/components/Detail.svelte';
	import Apply from '$lib/components/Apply.svelte';
	import LocaleDropdown from '$lib/misc/LocaleDropdown.svelte';
	import { currentLocale } from '$lib/nav/currentLocale';

	let offers = $state<SavedOffer[]>([]);
	let selectedOfferId = $state<string | null>(null);
	let view = $state<'catalog' | 'detail'>('catalog');
	let isSheetOpen = $state(false);

	const loadOffers = async () => {
		const response = await internal.getApi();
		if (response.offers) {
			offers = response.offers;
		}
	};

	let selectedOffer = $derived(offers.find((o) => o.id === selectedOfferId) ?? null);

	function selectOffer(id: string) {
		selectedOfferId = id;
		view = 'detail';
	}

	onMount(loadOffers);
</script>

<!-- CDN scripts injected at mount time via Svelte action or head tag in parent -->
<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Public+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" />
	<!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" /> -->
	<title>Praca EISG</title>
</svelte:head>

<Toasts />

<div class="app" id="app" data-view={view} data-sheet={isSheetOpen ? 'open' : 'closed'}>
	<!-- TOP BAR -->
	<div class="topbar">
		<div class="brand">
			<span class="mark">EI</span>
			<b>Praca<span>EISG</span></b>
		</div>
		<LocaleDropdown />
	</div>

	{#key $currentLocale}
		<div class="screens">
			<section class="screen" id="catalog">
				<Catalog {offers} onSelectOffer={selectOffer} />
			</section>

			<section class="screen" id="detail">
				{#if selectedOffer}
					<Detail offer={selectedOffer} onBack={() => (view = 'catalog')} onApply={() => (isSheetOpen = true)} />
				{/if}
			</section>
		</div>

		<Apply
			offer={selectedOffer}
			isOpen={isSheetOpen}
			onClose={() => (isSheetOpen = false)}
			onSuccessClose={() => {
				isSheetOpen = false;
				view = 'catalog';
			}}
		/>
	{/key}
</div>
