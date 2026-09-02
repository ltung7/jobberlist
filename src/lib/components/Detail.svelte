<script lang="ts">
	import { ACCOMMODATION_OPTION_LIST, BENEFITS_LIST, CONTRACT_OPTION_LIST_EN, SHIFT_OPTION_LIST_EN } from './const';

	interface Props {
		offer: SavedOffer;
		onBack: () => void;
		onApply: () => void;
	}

	let { offer, onBack, onApply }: Props = $props();

	const rateToString = () => {
		let rate = `${offer.rateTo} PLN per hour ${offer.rateNet ? 'net' : 'gross'}`;
		if (offer.rateFrom !== offer.rateTo) rate = `from ${offer.rateFrom} to ` + rate;
		return rate;
	};

	const rate = rateToString();
</script>

<div class="dbar">
	<button class="back" onclick={onBack} aria-label="Wróć">
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
	</button>
	<b>Oferta pracy</b>
</div>

<div class="scroll">
	<div class="dhead">
		<h1>{offer.jobType}</h1>
		<div class="loc">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
			{offer.location} · {offer.city}
		</div>
	</div>

	<div class="facts">
		<div class="fact hero">
			<div class="k">Stawka</div>
			<div class="v">{rate}</div>
		</div>
		<div class="fact">
			<div class="k">Rodzaj umowy</div>
			<div class="v">{CONTRACT_OPTION_LIST_EN[offer.contractType]}</div>
		</div>
		<div class="fact">
			<div class="k">Zmianowość</div>
			<div class="v">{SHIFT_OPTION_LIST_EN[offer.shift]}</div>
		</div>
		<div class="fact">
			<div class="k">Zakwaterowanie</div>
			<div class="v">{ACCOMMODATION_OPTION_LIST[offer.accommodation]}</div>
		</div>
	</div>

	<div class="sec">
		<h4>Opis stanowiska</h4>
		<p>{offer.workplaceDesc}</p>
	</div>

	<div class="sec">
		<h4>Zakres obowiązków</h4>
		<ul class="ul">
			{#each offer.duties.split('\r\n') as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>

	<div class="sec">
		<h4>Wymagania</h4>
		<ul class="ul">
			{#each offer.requirements.split('\r\n') as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>

	<div class="sec">
		<h4>Co oferujemy</h4>
		<ul class="ul check">
			{#each offer.benefits as item}
				<li>{BENEFITS_LIST[item]}</li>
			{/each}
		</ul>
	</div>

	<div class="detail-pad"></div>
</div>

<div class="cta-bar">
	<button class="btn-apply" onclick={onApply}>Aplikuj</button>
</div>
