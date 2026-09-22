<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';

	interface Props {
		offer: SavedOffer;
	}

    let { offer }: Props = $props();
</script>

{#if offer.rateTo > 0}
	{#if offer.rateFrom === offer.rateTo}
		<div style="text-align: center">
			<b style="color:#16a34a;">{offer.rateTo}</b>
		</div>
	{:else}
		<div style="text-align: center">
			<b style="color:#16a34a;">{offer.rateFrom}</b>
			<span style="font-size: 10px; color: gray;">to</span>
			<b style="color:#16a34a;">{offer.rateTo}</b>
		</div>
	{/if}
	<div style="font-size: 10px;">{m.rate_label({ rate: 'PLN', type: offer.rateNet ? m.rate_net() : m.rate_gross() })}</div>
{:else}
	<div style="text-align: center">
		<b style="color:#16a34a;">{m.rate_akord()}</b>
	</div>
	<div style="font-size: 10px;">{m.rate_result()}</div>
{/if}
