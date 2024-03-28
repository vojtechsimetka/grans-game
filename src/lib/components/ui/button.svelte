<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'
	type Variant = 'primary' | 'secondary' | 'ghost' | 'overlay' | 'darkoverlay'
	type Props = {
		variant: Variant
		active?: boolean
	}
	interface AnchorElement extends HTMLAnchorAttributes, Props {
		href?: HTMLAnchorAttributes['href']
		type?: never
		disabled?: never
	}

	interface ButtonElement extends HTMLButtonAttributes, Props {
		type?: HTMLButtonAttributes['type']
		href?: never
		disabled?: boolean
	}

	let { variant, active, disabled, href, ...restProps }: AnchorElement | ButtonElement = $props()
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	class={`${variant}`}
	{href}
	class:active
	{disabled}
	{...restProps}
>
	<slot />
</svelte:element>

<style>
	button,
	a {
		display: inline-flex;
		padding: 12px;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
		gap: 0.5rem;
		border-radius: 0.25rem;
		font-family: Arial;
		font-size: 1rem;
		font-style: normal;
		font-weight: 400;
		line-height: 1.5rem;
		letter-spacing: 0.02rem;
		border: 1px solid var(--color-ultra-high);
		cursor: pointer;
		text-decoration: none;
	}
	.primary {
		background: var(--color-ultra-high);
		color: var(--color-ultraLow);
	}
	.primary:active,
	.primary.active {
		background: var(--color-high);
		border: 1px solid var(--color-high);
	}
	.primary:disabled {
		opacity: 0.25;
	}
	.secondary {
		background: inherit;
		border: 1px solid var(--color-ultra-high);
		color: var(--color-ultra-high);
	}
	.secondary:active,
	.secondary.active {
		border: 1px solid var(--color-high);
		color: var(--color-high);
	}
	.secondary:disabled {
		opacity: 0.25;
	}
	.ghost {
		border: none;
		background: transparent;
		color: var(--color-ultra-high);
	}
	.ghost:active,
	.ghost.active {
		background: var(--color-low);
		color: var(--color-high);
	}
	.ghost:disabled {
		opacity: 0.25;
	}
	.overlay {
		border: none;
		background: var(--color-base);
		color: var(--color-ultra-high);
	}
	.overlay:active,
	.overlay.active {
		background: var(--color-low);
		color: var(--color-high);
	}
	.overlay:disabled {
		background: var(--color-base);
		opacity: 0.25;
	}
	.darkoverlay {
		border: none;
		background: var(--color-dark-overlay);
		color: var(--color-base-overlay);
	}
</style>
