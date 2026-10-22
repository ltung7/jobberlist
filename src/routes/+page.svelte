<script lang="ts">
	import { internal } from '$lib/nav/internal';
	import { onMount } from 'svelte';
	import Catalog from '$lib/components/Catalog.svelte';
	import Detail from '$lib/components/Detail.svelte';
	import RecruiterDetail, { getRecruiterOffer, RECRUITER_OFFER_ID } from '$lib/components/RecruiterDetail.svelte';
	import Apply from '$lib/components/Apply.svelte';
	import { currentLocale, view, isApplyOpen } from '$lib/nav/stores';
	import { m } from '$lib/paraglide/messages.js';

	let offers = $state<SavedOffer[]>([]);
	let selectedOfferId = $state<string | null>(null);

	const loadOffers = async () => {
		const response = await internal.getApi();
		if (response.offers) {
			offers = response.offers;
		}
	};

	let selectedOffer = $derived(offers.find((o) => o.id === selectedOfferId) ?? null);
	let isRecruiterSelected = $derived(selectedOfferId === RECRUITER_OFFER_ID);
	let applyOffer = $derived.by(() => {
		$currentLocale;
		return isRecruiterSelected ? getRecruiterOffer() : selectedOffer;
	});

	function selectOffer(id: string) {
		selectedOfferId = id;
		$view = 'detail';
		history.pushState({ view: 'detail', selectedOfferId: id, applyOpen: false }, '');
	}

	let isPopStateAction = false;

	// When opening/closing apply modal via UI, use replaceState instead of pushState
	// so opening and closing the apply modal doesn't stack history entries.
	$effect(() => {
		if (isPopStateAction) return;

		const currentState = history.state || {};
		if ($isApplyOpen && !currentState.applyOpen) {
			history.replaceState({ view: 'detail', selectedOfferId, applyOpen: true }, '');
		} else if (!$isApplyOpen && currentState.applyOpen) {
			history.replaceState({ view: 'detail', selectedOfferId, applyOpen: false }, '');
		}
	});

	onMount(() => {
		loadOffers();
		if (!history.state || history.state.view === undefined) {
			history.replaceState({ view: 'catalog', selectedOfferId: null, applyOpen: false }, '');
		}
	});
</script>

<svelte:window
	onpopstate={(e) => {
		isPopStateAction = true;
		const state = e.state;
		if (state && state.view === 'detail') {
			selectedOfferId = state.selectedOfferId;
			$view = 'detail';
			$isApplyOpen = !!state.applyOpen;
		} else {
			selectedOfferId = null;
			$view = 'catalog';
			$isApplyOpen = false;
		}
		setTimeout(() => {
			isPopStateAction = false;
		}, 0);
	}}
/>

<div class="screens">
	<section class="screen" id="catalog">
		<Catalog {offers} onSelectOffer={selectOffer} />
	</section>

	<section class="screen" id="detail">
		{#if isRecruiterSelected}
			<RecruiterDetail
				onBack={() => {
					selectedOfferId = null;
					$view = 'catalog';
					$isApplyOpen = false;
					history.back();
				}}
			/>
		{:else if selectedOffer}
			<Detail
				offer={selectedOffer}
				onBack={() => {
					selectedOfferId = null;
					$view = 'catalog';
					$isApplyOpen = false;
					history.back();
				}}
			/>
		{/if}
	</section>
</div>

{#if applyOffer}
	<Apply
		offer={applyOffer}
		onSuccessClose={() => {
			$isApplyOpen = false;
			selectedOfferId = null;
			$view = 'catalog';
		}}
	/>
{/if}
