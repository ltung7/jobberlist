<script lang="ts">
	interface Props {
		text?: string;
		caption: string;
		check?: boolean;
	}

	let { text = '', caption, check = false }: Props = $props();

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

{#if items.length > 0}
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
