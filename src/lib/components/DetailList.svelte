<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { currentLocale } from '$lib/nav/stores';
	import { trackGtmEvent } from '$lib/gtm';

	interface Props {
		text?: string;
		caption: string;
		check?: boolean;
		onSelect?: () => void;
	}

	let { text = '', caption, check = false, onSelect }: Props = $props();

	const hasNewlines = $derived(text.includes('\n'));
	const items = $derived(
		text
			? text
					.split(/\r?\n/)
					.map((item) => {
						const trimmed = item.trim();
						return trimmed.startsWith('* ') ? trimmed.slice(2).trim() : trimmed;
					})
					.filter(Boolean)
			: []
	);
</script>

{#key $currentLocale}
	{#if onSelect}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="recruiter-offer-card"
			onclick={() => {
				trackGtmEvent('select_item', {
					item_id: 'recruiter',
					item_name: m.recruiter_program_title(),
					item_category: 'Hiring Program'
				});
				onSelect();
			}}
		>
			<div class="recruiter-offer-badge">{m.recruiter_program_badge()}</div>
			<h2>{m.recruiter_program_title()}</h2>
			<p class="recruiter-intro">{@html m.recruiter_program_intro()}</p>
			<div class="card-foot" style="border-top: 1px solid rgba(255,255,255,0.3); padding-top: 10px; margin-top: 4px;">
				<span class="more" style="color: var(--amber-ink); font-weight: 700;">{m.see_offer()}</span>
			</div>
		</div>
	{:else if items.length > 0}
		<div class="sec">
			<h4>{caption}</h4>
			{#if hasNewlines}
				<ul class="ul" class:check>
					{#each items as item}
						<li>{item}</li>
					{/each}
				</ul>
			{:else}
				<p>{items[0] || text}</p>
			{/if}
		</div>
	{/if}
{/key}

<style>
	.recruiter-offer-card {
		background: #f39331;
		color: #1a1205;
		border-radius: 16px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		box-shadow: 0 10px 25px -5px rgba(243, 147, 49, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.4);
		text-align: left;
		cursor: pointer;
		position: relative;
		transition: 0.16s;
	}
	.recruiter-offer-card:hover {
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
		font-size: 1.15rem;
		line-height: 1.2;
		font-weight: 800;
		letter-spacing: -0.02em;
		margin: 0;
	}
	.recruiter-intro {
		font-size: 0.88rem;
		line-height: 1.45;
		margin: 0;
		font-weight: 500;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.card-foot {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.more {
		font-size: 0.82rem;
		font-weight: 600;
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
</style>
