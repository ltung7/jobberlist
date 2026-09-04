<script lang="ts">
	import '$lib/assets/custom.css'
	import LocaleDropdown from '$lib/misc/LocaleDropdown.svelte';
	import { currentLocale, isApplyOpen, view } from '$lib/nav/stores';
	import Toasts from '$lib/toast/Toasts.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Praca EISG</title>
</svelte:head>

<Toasts />

<div class="app" id="app" data-view={$view} data-sheet={$isApplyOpen ? 'open' : 'closed'}>
	<!-- TOP BAR -->
	<div class="topbar">
		<div class="brand">
			<span class="mark">EI</span>
			<b>Praca<span>EISG</span></b>
		</div>
		<LocaleDropdown />
	</div>

	{@render children()}
</div>