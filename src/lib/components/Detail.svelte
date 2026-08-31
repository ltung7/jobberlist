<script lang="ts">
	interface Props {
		offer: Offer;
		onBack: () => void;
		onApply: () => void;
	}

	let { offer, onBack, onApply }: Props = $props();

	let recruiterInitials = $derived(
		offer.rekruter
			.split(' ')
			.map((w) => w[0])
			.join('')
	);
</script>

<div class="dbar">
	<button class="back" onclick={onBack} aria-label="Wróć">
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
	</button>
	<b>Oferta pracy</b>
</div>

<div class="scroll">
	<div class="dhead">
		<h1>{offer.stanowisko}</h1>
		<div class="loc">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
			{offer.loc} · {offer.kraj}
		</div>
	</div>

	<div class="facts">
		<div class="fact hero">
			<div class="k">Stawka</div>
			<div class="v">{offer.rate} <span style="font-size:.8rem;font-weight:600">{offer.unit.replace('brutto', '').trim()}</span></div>
		</div>
		<div class="fact">
			<div class="k">Rodzaj umowy</div>
			<div class="v">{offer.umowa}</div>
		</div>
		<div class="fact">
			<div class="k">Zmianowość</div>
			<div class="v">{offer.zmiana}</div>
		</div>
		<div class="fact">
			<div class="k">Zakwaterowanie</div>
			<div class="v">{offer.dom}</div>
		</div>
		<div class="fact">
			<div class="k">Język</div>
			<div class="v">{offer.jezyk}</div>
		</div>
	</div>

	<div class="sec">
		<h4>Opis stanowiska</h4>
		<p>{offer.opis}</p>
	</div>

	<div class="sec">
		<h4>Zakres obowiązków</h4>
		<ul class="ul">
			{#each offer.obowiazki as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>

	<div class="sec">
		<h4>Wymagania</h4>
		<ul class="ul">
			{#each offer.wymagania as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>

	<div class="sec">
		<h4>Co oferujemy</h4>
		<ul class="ul check">
			{#each offer.oferujemy as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>

	<div class="recruiter">
		<div class="av">{recruiterInitials}</div>
		<div>
			<div class="k">Twój rekruter</div>
			<div class="v">{offer.rekruter}</div>
		</div>
	</div>

	<div class="detail-pad"></div>
</div>

<div class="cta-bar">
	<div class="cta-rate">{offer.rate}<small>{offer.unit}</small></div>
	<button class="btn-apply" onclick={onApply}>Aplikuj</button>
</div>
