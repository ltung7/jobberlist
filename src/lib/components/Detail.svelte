<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { currentLocale, isApplyOpen } from '$lib/nav/stores';
	import ShareButton from './ShareButton.svelte';
	import DetailList from './DetailList.svelte';
	import { PUBLIC_URL } from '$env/static/public';

	interface Props {
		offer: SavedOffer;
		onBack: () => void;
	}

	let { offer, onBack }: Props = $props();

	const rate = $derived.by(() => {
		$currentLocale;
		const typeLabel = offer.rateNet ? m.rate_net() : m.rate_gross();
		const baseRate = m.rate_label({ rate: `${offer.rateTo}`, type: typeLabel });
		if (offer.rateFrom !== offer.rateTo) {
			return `${offer.rateFrom} – ${baseRate}`;
		}
		return baseRate;
	});

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
		'': m.accommodation_,
		free: m.accommodation_free,
		subsidized: m.accommodation_subsidized,
		hostel: m.accommodation_hostel,
		apartment: m.accommodation_apartment,
		allowance: m.accommodation_allowance,
		couples: m.accommodation_couples,
		hotel: m.accommodation_hotel
	} as const;
	const BENEFITS_LABELS = {
		training: m.benefits_training,
		accommodation: m.benefits_accommodation,
		transport: m.benefits_transport,
		meals: m.benefits_meals,
		clothing: m.benefits_clothing,
		legalization: m.benefits_legalization,
		formalities: m.benefits_formalities,
		stability: m.benefits_stability,
		salary: m.benefits_salary,
		environment: m.benefits_environment
	} as const;
</script>

{#key $currentLocale}
	<div class="dbar" style="display: flex; justify-content: space-between">
		<div style="display: flex; align-items: center;">
			<button class="back" onclick={onBack} aria-label={m.detail_back()}>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
			</button>
			<b style="margin-left: 5px;">{m.detail_back()}</b>
		</div>
		<ShareButton url={PUBLIC_URL + '/offers/' + offer.id} />
	</div>

	<div class="scroll">
		<div class="dhead">
			<h1>{offer.lang[$currentLocale]?.jobType || offer.jobType}</h1>
			<div class="loc">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
				{offer.location} · {offer.city}
			</div>
		</div>

		<div class="facts">
			<div class="fact hero">
				<div class="k">{m.detail_rate()}</div>
				<div class="v">{rate}</div>
			</div>
			<div class="fact">
				<div class="k">{m.detail_contract()}</div>
				<div class="v">{CONTRACT_LABELS[offer.contractType]()}</div>
			</div>
			<div class="fact">
				<div class="k">{m.detail_shift()}</div>
				<div class="v">{SHIFT_LABELS[offer.shift]()}</div>
			</div>
			<div class="fact" style="grid-column: 1 / -1;">
				<div class="k">{m.detail_accommodation()}</div>
				<div class="v">{ACCOMMODATION_LABELS[offer.accommodation]()}</div>
			</div>
		</div>

		<DetailList text={offer.lang[$currentLocale]?.workplaceDesc || offer.workplaceDesc} caption={m.detail_job_description()} />

		<DetailList text={offer.lang[$currentLocale]?.duties || offer.duties} caption={m.detail_duties()} />

		<DetailList text={offer.lang[$currentLocale]?.requirements || offer.requirements} caption={m.detail_requirements()} />

		{#if offer.benefits.length}
			<div class="sec">
				<h4>{m.detail_what_we_offer()}</h4>
				<ul class="ul check">
					{#each offer.benefits as item}
						<li>{BENEFITS_LABELS[item]()}</li>
					{/each}
				</ul>
			</div>
		{/if}

		<div class="detail-pad"></div>
	</div>

	<div class="cta-bar">
		<button class="btn-apply" onclick={() => ($isApplyOpen = true)}>{m.detail_apply()}</button>
	</div>
{/key}
