<script lang="ts">
	import { ACCOMMODATION_OPTION_LIST, CONTRACT_OPTION_LIST_EN, SHIFT_OPTION_LIST_EN } from "./const";

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
			{ label: 'Wszystkie', loc: 'all' },
			...uniqueLocations.map((loc) => {
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

	// Dynamic offer count text with correct Polish pluralization
	let countText = $derived(`${filteredOffers.length} ${filteredOffers.length === 1 ? 'oferta' : filteredOffers.length < 5 ? 'oferty' : 'ofert'}`);
</script>

<div class="scroll">
	<div class="lede">
		<h1>Oferty pracy od zaraz</h1>
		<p>Wybierz stanowisko, zostaw numer — oddzwonimy i dopowiemy szczegóły.</p>
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
						<h3>{o.jobType}</h3>
						<div class="loc">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
								<circle cx="12" cy="10" r="3" />
							</svg>
							{#if o.location.length}{o.location},{/if} {o.city}
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
						<div style="font-size: 10px;">PLN per hour <b>{o.rateNet ? 'net' : 'gross'}</b></div>
					</div>
				</div>

				<div class="tags">
					<!-- {#if now < (new Date(o.availableFrom).valueOf())}
						<span class="pill-go">Od zaraz</span>
					{/if} -->
					<span class="tag">{CONTRACT_OPTION_LIST_EN[o.contractType]}</span>
					<span class="tag">{SHIFT_OPTION_LIST_EN[o.shift]}</span>
					{#if o.accommodation?.length}
						<span class="tag home">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M3 10l9-7 9 7" />
								<path d="M5 9v11h14V9" />
							</svg>
							{ACCOMMODATION_OPTION_LIST[o.accommodation]}
						</span>
					{/if}
				</div>

				<div class="card-foot">
					<span class="tag" style="background:transparent;padding-left:0">🗣 {o.langExtra}</span>
					<span class="more">Zobacz ofertę →</span>
				</div>
			</button>
		{/each}
	</div>
</div>
