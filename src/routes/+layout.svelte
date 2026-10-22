<script lang="ts">
	import '$lib/assets/custom.css'
	import LocaleDropdown from '$lib/misc/LocaleDropdown.svelte';
	import { isApplyOpen, view } from '$lib/nav/stores';
	import Toasts from '$lib/toast/Toasts.svelte';
	import logo from '$lib/assets/eisg_logo_standard.svg';

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
			<img src={logo} alt="Praca EISG" width="588" height="227" />
		</div>
		<LocaleDropdown />
	</div>

	{@render children()}
</div>