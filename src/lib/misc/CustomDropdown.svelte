<!-- SelectDropdown.svelte -->
<script lang="ts" generics="T extends string">
	interface Props {
		list: Record<T, string>;
		selected: T;
		onchange?: (value: T) => void;
	}

	let { list, selected = $bindable(), onchange }: Props = $props();

	let isOpen = $state(false);

	function toggle() {
		isOpen = !isOpen;
	}

	function close() {
		isOpen = false;
	}

	function handleSelect(key: T) {
		selected = key;
		onchange?.(key);
		close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}

	function clickOutside(node: HTMLElement) {
		const handleClick = (e: MouseEvent) => {
			if (!node.contains(e.target as Node)) close();
		};
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="dropdown" use:clickOutside>
	<button
		type="button"
		class="dropdown-toggle"
		aria-expanded={isOpen}
		aria-haspopup="true"
		onclick={toggle}
	>
		<span class="label-content">{@html list[selected]}</span>
		<span class="caret">▼</span>
	</button>

	{#if isOpen}
		<div class="dropdown-menu" role="menu">
			{#each Object.entries(list) as [key, htmlContent] (key)}
				<button
					type="button"
					class="dropdown-item"
					class:active={key === selected}
					role="menuitem"
					onclick={() => handleSelect(key as T)}
				>
					{@html htmlContent}
				</button>
			{/each}
		</div>
	{/if}
</div>