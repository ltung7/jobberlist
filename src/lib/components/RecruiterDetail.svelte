<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { currentLocale, isApplyOpen } from '$lib/nav/stores';
	import { trackGtmEvent } from '$lib/gtm';
	import ShareButton from './ShareButton.svelte';
	import { PUBLIC_URL } from '$env/static/public';

	interface Props {
		onBack: () => void;
	}

	let { onBack }: Props = $props();

	$effect(() => {
		trackGtmEvent('view_item', {
			item_id: 'recruiter',
			item_name: m.recruiter_program_title(),
			item_category: 'Hiring Program',
			city: 'Poland'
		});
	});
</script>

{#key $currentLocale}
	<div class="dbar" style="display: flex; justify-content: space-between">
		<div style="display: flex; align-items: center;">
			<button class="back" onclick={onBack} aria-label={m.detail_back()}>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
			</button>
			<b style="margin-left: 5px;">{m.detail_back()}</b>
		</div>
		<ShareButton url={PUBLIC_URL + '/offers/recruiter'} onShare={(method: string) => {
			trackGtmEvent('share', {
				method: method,
				content_type: 'offer',
				item_id: 'recruiter'
			});
		}} />
	</div>

	<div class="scroll">
		<div class="dhead">
			<h1>{m.recruiter_program_title()}</h1>
			<div class="loc">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
				Poland · Everest Hiring Program
			</div>
		</div>

		<div class="facts">
			<div class="fact hero">
				<div class="k">{m.recruiter_fact_bonus()}</div>
				<div class="v">{m.recruiter_fact_bonus_val()}</div>
			</div>
			<div class="fact">
				<div class="k">{m.recruiter_fact_period()}</div>
				<div class="v">{m.recruiter_fact_period_val()}</div>
			</div>
			<div class="fact">
				<div class="k">{m.recruiter_fact_limit()}</div>
				<div class="v">{m.recruiter_fact_limit_val()}</div>
			</div>
		</div>

		<div class="sec">
			<h4>{m.recruiter_section_1_title()}</h4>
			<p>{@html m.recruiter_section_1_text()}</p>
		</div>

		<div class="sec">
			<h4>{m.recruiter_section_2_title()}</h4>
			<ul class="ul check">
				<li>{@html m.recruiter_list_2_1()}</li>
				<li>{@html m.recruiter_list_2_2()}</li>
				<li>{@html m.recruiter_list_2_3()}</li>
				<li>{@html m.recruiter_list_2_4()}</li>
			</ul>
		</div>

		<div class="sec">
			<h4>{m.recruiter_section_3_title()}</h4>
			<ul class="ul check">
				<li>{@html m.recruiter_list_3_1()}</li>
				<li>{@html m.recruiter_list_3_2()}</li>
				<li>{@html m.recruiter_list_3_3()}</li>
				<li>{@html m.recruiter_list_3_4()}</li>
			</ul>
		</div>

		<div class="sec">
			<p style="font-weight: 700; color: var(--ink);">{@html m.recruiter_program_footer()}</p>
		</div>

		<div class="detail-pad"></div>
	</div>

	<div class="cta-bar">
		<button
			class="btn-apply"
			onclick={() => {
				$isApplyOpen = true;
				trackGtmEvent('contact_form_open', {
					item_id: 'recruiter',
					item_name: m.recruiter_program_title(),
					item_category: 'Hiring Program',
					city: 'Poland'
				});
			}}>{m.detail_apply()}</button
		>
	</div>
{/key}
