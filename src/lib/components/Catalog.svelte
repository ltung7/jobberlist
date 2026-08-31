<script lang="ts">
	interface Props {
		offers: Offer[];
		onSelectOffer: (id: string) => void;
	}

	let { offers, onSelectOffer }: Props = $props();

	// Currently active location filter ('all' or a specific location string)
	let activeLoc = $state('all');

	// Dynamically create filter chips whenever `offers` changes
	let filterChips = $derived.by(() => {
		// Collect all unique location values from the current offers list
		const uniqueLocations = Array.from(new Set(offers.map((o) => o.loc)));

		return [
			{ label: 'Wszystkie', loc: 'all' },
			...uniqueLocations.map((loc) => {
				// If the country is Germany ('Niemcy'), display 'Niemcy' as the chip label
				const sampleOffer = offers.find((o) => o.loc === loc);
				const label = sampleOffer?.kraj === 'Niemcy' ? 'Niemcy' : loc;
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
	let filteredOffers = $derived(offers.filter((o) => (activeLoc === 'all' ? true : o.loc === activeLoc)));

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
						<h3>{o.stanowisko}</h3>
						<div class="loc">
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
								<circle cx="12" cy="10" r="3" />
							</svg>
							{o.loc}{o.kraj === 'Niemcy' ? ' · Niemcy' : ''}
						</div>
					</div>
					<div class="rate">
						{o.rate}<small>{o.unit}</small>
					</div>
				</div>

				<div class="tags">
					{#if o.odZaraz}
						<span class="pill-go">Od zaraz</span>
					{/if}
					<span class="tag">{o.umowa}</span>
					<span class="tag">{o.zmiana}</span>
					{#if o.dom.includes('Zakwaterowanie')}
						<span class="tag home">
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M3 10l9-7 9 7" />
								<path d="M5 9v11h14V9" />
							</svg>
							Zakwaterowanie
						</span>
					{/if}
				</div>

				<div class="card-foot">
					<span class="tag" style="background:transparent;padding-left:0">🗣 {o.jezyk}</span>
					<span class="more">Zobacz ofertę →</span>
				</div>
			</button>
		{/each}
	</div>
</div>
