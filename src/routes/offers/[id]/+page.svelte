<script lang="ts">
	import { goto } from '$app/navigation';
	import Apply from '$lib/components/Apply.svelte';
	import Detail from '$lib/components/Detail.svelte';
	import LocaleDropdown from '$lib/misc/LocaleDropdown.svelte';
	import { currentLocale } from '$lib/nav/currentLocale';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let isApplyOpen = $state(false);

	const onBack = () => {
		goto('/');
	};
</script>

<div class="app" id="app" data-sheet={isApplyOpen ? 'open' : 'closed'}>
	<div class="topbar">
		<div class="brand">
			<span class="mark">EI</span>
			<b>Praca<span>EISG</span></b>
		</div>
		<LocaleDropdown />
	</div>

    {#key $currentLocale}
        <Detail offer={data.offer} {onBack} onApply={() => (isApplyOpen = true)} />

        <Apply
            offer={data.offer}
            isOpen={isApplyOpen}
            onClose={() => (isApplyOpen = false)}
            onSuccessClose={() => {
                isApplyOpen = false;
            }}
        />
    {/key}
</div>
