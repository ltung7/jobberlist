<script lang="ts">
	import { internal } from "$lib/nav/internal";

	interface Props {
		offer: SavedOffer | null;
		isOpen: boolean;
		onClose: () => void;
		onSuccessClose: () => void;
	}

	let { offer, isOpen, onClose, onSuccessClose }: Props = $props();

	let fName = $state('');
	let fPhone = $state('');
	let fRodo = $state(false);
	let isSubmitted = $state(false);

	let isValid = $derived(fPhone.replace(/\D/g, '').length >= 9 && fRodo);

	$effect(() => {
		if (isOpen) {
			fName = '';
			fPhone = '';
			fRodo = false;
			isSubmitted = false;
		}
	});

	async function handleSubmit() {
		if (isValid) {
			const urlParams = new URLSearchParams(window.location.search);
			const data: BitrixLeadData = {
				name: fName,
				phone: fPhone,
				offerId: offer!.id,
				utm_source: urlParams.get('utm_source') ?? '',
				utm_medium: urlParams.get('utm_medium') ?? '',
				utm_campaign: urlParams.get('utm_campaign') ?? '',
				utm_term: urlParams.get('utm_term') ?? '',
				utm_content: urlParams.get('utm_content') ?? '',
			}
			await internal.post('/bitrix', data);
			isSubmitted = true;
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="scrim" onclick={onClose}></div>

<div class="sheet" role="dialog" aria-modal="true" aria-label="Zostaw numer">
	<div class="grip"></div>

	{#if !isSubmitted}
		<div class="form-wrap">
			<h2>Zostaw numer</h2>
			<p class="for">Oddzwaniamy zwykle w ciągu 24 h. Aplikujesz na: <b>{offer?.jobType} · {offer?.location}, {offer?.city}</b></p>

			<div class="field">
				<label for="fName">Imię</label>
				<input type="text" id="fName" bind:value={fName} placeholder="np. Marek" autocomplete="given-name" />
			</div>

			<div class="field">
				<label for="fPhone">Numer telefonu</label>
				<input type="tel" id="fPhone" bind:value={fPhone} placeholder="+48 600 000 000" autocomplete="tel" />
			</div>

			<div class="consent">
				<input type="checkbox" id="fRodo" bind:checked={fRodo} />
				<label for="fRodo">Zgadzam się na kontakt telefoniczny i przetwarzanie moich danych w celu rekrutacji (RODO).</label>
			</div>

			<button class="btn-send" disabled={!isValid} onclick={handleSubmit}> Wyślij zgłoszenie </button>
		</div>
	{:else}
		<div class="success">
			<div class="ok">
				<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
			</div>
			<h2>Dziękujemy!</h2>
			<p>Zadzwonimy do Ciebie w ciągu 24 godzin. Odbierz telefon z numeru EISG.</p>
			<button class="btn-send" style="background:var(--surface-2);color:var(--ink)" onclick={onSuccessClose}> Wróć do ofert </button>
		</div>
	{/if}
</div>
