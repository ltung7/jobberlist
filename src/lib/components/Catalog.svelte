<script lang="ts">
	import { getOfertaCountText } from '$lib/nav/plurals';
	import { m } from '$lib/paraglide/messages.js';
	import { currentLocale } from '$lib/nav/stores';

	interface Props {
		offers: SavedOffer[];
		onSelectOffer: (id: string) => void;
	}

	let { offers, onSelectOffer }: Props = $props();
	const now = Date.now();

	// Currently active location filter ('all' or a specific location string)
	let activeLoc = $state('all');

	// Dynamically create filter chips whenever `offers` changes
	let filterChips = $derived.by(() => {
		// Collect all unique location values from the current offers list
		const uniqueLocations = Array.from(new Set(offers.map((o) => o.city)));

		return [
			{ label: m.filter_all(), loc: 'all' },
			...uniqueLocations.map((loc) => {
				// City names are data, not UI chrome — leave them as-is
				const label = loc;
				return { label, loc };
			})
		];
	});

	// Automatically reset filter to 'all' if the selected location is no longer present
	$effect(() => {
		const isStillValid = filterChips.some((chip) => chip.loc === activeLoc);
		if (!isStillValid) {
			activeLoc = 'all';
		}
	});

	// Filter offers based on active location selection
	let filteredOffers = $derived(offers.filter((o) => (activeLoc === 'all' ? true : o.city === activeLoc)));

	// Dynamic offer count text using paraglide pluralization
	let countText = $derived(getOfertaCountText(filteredOffers.length));

	// Lookup tables for the translated tag labels, keyed by the raw offer data values
	const CONTRACT_LABELS = {
		uop: m.contract_uop,
		uoz: m.contract_uoz,
		uod: m.contract_uod
	} as const;
	const SHIFT_LABELS = {
		one: m.shift_one,
		two: m.shift_two,
		three: m.shift_three,
		agree: m.shift_agree,
		flex: m.shift_flex
	} as const;
	const ACCOMMODATION_LABELS = {
		'': m.accom_,
		free: m.accom_free,
		subsidized: m.accom_subsidized,
		hostel: m.accom_hostel,
		apartment: m.accom_apartment,
		allowance: m.accom_allowance,
		couples: m.accom_couples,
		hotel: m.accom_hotel
	} as const;
</script>

{#key $currentLocale}
	<div class="scroll">
		<div class="lede">
			<h1>{m.catalog_heading()}</h1>
			<p>{m.catalog_subheading()}</p>
		</div>

		<div class="filters">
			{#each filterChips as chip (chip.loc)}
				<button class="chip" aria-pressed={activeLoc === chip.loc} onclick={() => (activeLoc = chip.loc)}>
					{chip.label}
				</button>
			{/each}
		</div>

		<div class="count">{countText}</div>

		<div class="list">
			{#each filteredOffers as o (o.id)}
				<button class="card" onclick={() => onSelectOffer(o.id)}>
					<div class="card-top">
						<div>
							<h3>{o.lang[$currentLocale]?.jobType || o.jobType}</h3>
							<div class="loc">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
									<circle cx="12" cy="10" r="3" />
								</svg>
								{#if o.location.length}{o.location},{/if}
								{o.city}
							</div>
						</div>
						<div class="rate">
							{#if o.rateFrom === o.rateTo}
								<div style="text-align: center">
									<b style="color:#16a34a;">{o.rateTo}</b>
								</div>
							{:else}
								<div style="text-align: center">
									<b style="color:#16a34a;">{o.rateFrom}</b>
									<span style="font-size: 10px; color: gray;">to</span>
									<b style="color:#16a34a;">{o.rateTo}</b>
								</div>
							{/if}
							<div style="font-size: 10px;">{m.rate_label({ rate: 'PLN', type: o.rateNet ? m.rate_net() : m.rate_gross() })}</div>
						</div>
					</div>

					<div class="tags">
						{#if now < new Date(o.availableFrom).valueOf()}
							<span class="pill-go">{m.from_now()}</span>
						{/if}
						<span class="tag">{CONTRACT_LABELS[o.contractType]()}</span>
						<span class="tag">{SHIFT_LABELS[o.shift]()}</span>
						{#if o.accommodation?.length}
							<span class="tag home">
								<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M3 10l9-7 9 7" />
									<path d="M5 9v11h14V9" />
								</svg>
								{ACCOMMODATION_LABELS[o.accommodation]()}
							</span>
						{/if}
					</div>

					<div class="card-foot">
						<!-- <span class="tag" style="background:transparent;padding-left:0">🗣 {o.langExtra}</span> -->
						<span class="more">{m.see_offer()}</span>
					</div>
				</button>
			{/each}
		</div>
	</div>
{/key}
