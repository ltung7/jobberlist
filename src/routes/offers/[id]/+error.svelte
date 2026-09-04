<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentLocale } from '$lib/nav/stores';
	import { m } from '$lib/paraglide/messages.js';

	const onBack = () => {
		goto('/');
	};
</script>

{#key $currentLocale}
	<div class="dbar">
		<div style="display: flex; align-items: center;">
			<button class="back" onclick={onBack} aria-label={m.detail_back()}>
				<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
			</button>
			<b style="margin-left: 5px;">{m.detail_back()}</b>
		</div>
	</div>

	<section>
		<div class="scroll">
			<div class="dhead">
				<h1>{m.error_unavailable()}</h1>
				<div style="padding-top: 10px; padding-bottom: 10px;">{m.error_message()}</div>
			</div>
			<div class="sec">
				<h4>{m.error_looking_for()}</h4>
				<p>{m.error_return()}</p>
			</div>
			<div class="sec">
				<h4>{m.error_already_applied()}</h4>
				<p>{m.error_applied_text()}</p>
			</div>
		</div>
	</section>
{/key}
