<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { currentLocale, isApplyOpen } from '$lib/nav/stores';
	import { trackGtmEvent } from '$lib/gtm';
	import ShareButton from './ShareButton.svelte';
	import { PUBLIC_URL } from '$env/static/public';

	interface Props {
		onApplyClick?: () => void;
		onBack?: () => void;
		isDetail?: boolean;
	}

	let { onApplyClick, onBack, isDetail = false }: Props = $props();
</script>

{#key $currentLocale}
	{#if isDetail}
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
	{/if}

	<div class={isDetail ? "scroll" : ""} style={isDetail ? "" : "width: 100%;"}>
		{#if isDetail}
			<div class="dhead">
				<h1>{m.recruiter_program_title()}</h1>
				<div class="loc" style="color: var(--amber-ink);">
					{m.recruiter_program_badge()}
				</div>
			</div>
		{/if}

		<div class="recruiter-offer-card {isDetail ? 'detail-version' : ''}">
			<div class="recruiter-offer-badge">{m.recruiter_program_badge()}</div>
			<h2>{m.recruiter_program_title()}</h2>
			<p class="recruiter-intro">{@html m.recruiter_program_intro()}</p>

			<div class="recruiter-section">
				<h3>{m.recruiter_section_1_title()}</h3>
				<p>{@html m.recruiter_section_1_text()}</p>
			</div>

			<div class="recruiter-section">
				<h3>{m.recruiter_section_2_title()}</h3>
				<ul class="recruiter-list">
					<li>{@html m.recruiter_list_2_1()}</li>
					<li>{@html m.recruiter_list_2_2()}</li>
					<li>{@html m.recruiter_list_2_3()}</li>
					<li>{@html m.recruiter_list_2_4()}</li>
				</ul>
			</div>

			<div class="recruiter-section">
				<h3>{m.recruiter_section_3_title()}</h3>
				<ul class="recruiter-list">
					<li>{@html m.recruiter_list_3_1()}</li>
					<li>{@html m.recruiter_list_3_2()}</li>
					<li>{@html m.recruiter_list_3_3()}</li>
					<li>{@html m.recruiter_list_3_4()}</li>
				</ul>
			</div>

			<p class="recruiter-footer-text">{@html m.recruiter_program_footer()}</p>

			{#if !isDetail}
				<div class="recruiter-card-actions">
					<button
						class="btn-apply"
						onclick={(e) => {
							e.stopPropagation();
							trackGtmEvent('contact_form_open', {
								item_id: 'recruiter',
								item_name: m.recruiter_program_title(),
								item_category: 'Hiring Program',
								city: 'Poland'
							});
							onApplyClick?.();
						}}
					>
						{m.detail_apply()}
					</button>
				</div>
			{/if}
		</div>

		{#if isDetail}
			<div class="detail-pad"></div>
		{/if}
	</div>

	{#if isDetail}
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
	{/if}
{/key}

<style>
	.recruiter-offer-card {
		background: #f39331;
		color: #1a1205;
		border-radius: 16px;
		padding: 20px 18px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		box-shadow: 0 10px 25px -5px rgba(243, 147, 49, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.4);
		text-align: left;
		cursor: pointer;
		position: relative;
		transition: 0.16s;
	}
	.recruiter-offer-card.detail-version {
		margin: 18px;
		cursor: default;
		box-shadow: none;
	}
	.recruiter-offer-card:not(.detail-version):hover {
		transform: translateY(-1px);
		filter: brightness(1.02);
	}
	.recruiter-offer-badge {
		align-self: flex-start;
		font-size: 0.7rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		background: rgba(255, 255, 255, 0.3);
		color: #1a1205;
		padding: 4px 10px;
		border-radius: 6px;
	}
	.recruiter-offer-card h2 {
		font-size: 1.25rem;
		line-height: 1.2;
		font-weight: 800;
		letter-spacing: -0.02em;
		margin: 0;
	}
	.recruiter-intro {
		font-size: 0.92rem;
		line-height: 1.5;
		margin: 0;
		font-weight: 500;
	}
	.recruiter-section {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.recruiter-section h3 {
		font-size: 0.95rem;
		font-weight: 800;
		letter-spacing: -0.01em;
		margin: 0;
	}
	.recruiter-section p {
		font-size: 0.88rem;
		line-height: 1.5;
		margin: 0;
	}
	.recruiter-list {
		list-style: disc;
		margin: 0;
		padding-left: 20px;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.recruiter-list li {
		font-size: 0.88rem;
		line-height: 1.45;
	}
	.recruiter-footer-text {
		font-size: 0.92rem;
		font-weight: 700;
		margin: 4px 0 0 0;
		text-align: center;
		letter-spacing: -0.01em;
	}
	.recruiter-card-actions {
		margin-top: 4px;
	}
</style>
