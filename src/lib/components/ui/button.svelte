<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	type Variant = 'primary' | 'secondary' | 'overlay' | 'ghost'

	type Props = {
		variant?: Variant
		active?: boolean
	}

	interface AnchorElement extends Props, HTMLAnchorAttributes {
		href?: HTMLAnchorAttributes['href']
		type?: never
	}

	interface ButtonElement extends Props, HTMLButtonAttributes {
		type?: HTMLButtonAttributes['type']
		href?: never
	}

	let {
		class: className,
		variant = 'secondary',
		active,
		href,
		type,
		role,
		children,
		...restProps
	} = $props<AnchorElement | ButtonElement>()
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	type={href ? undefined : type}
	role={role ?? href ? 'link' : 'button'}
	{href}
	class:active
	class={`${variant} ${className}`}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</svelte:element>

<style lang="scss">
	a,
	button {
		background-color: var(--color-base);
		border: 1px solid var(--color-low);
		border-radius: var(--border-radius);
		color: var(--color-ultra-high);
		font-size: var(--font-size-normal);
		font-weight: var(--font-weight-500);
		line-height: 1.25;
		padding: var(--spacing-3);
		overflow-wrap: normal;
		cursor: pointer;
		display: inline-flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		margin-block: 0;
		gap: var(--spacing-2);
		white-space: nowrap;
		text-decoration: none;

		:global(svg) {
			fill: var(--color-ultra-high);
			width: 20px;
			height: 20px;
		}

		&:hover:not(:disabled),
		&:active:not(:disabled),
		&.active:not(:disabled),
		&:focus:not(:disabled) {
			background-color: var(--color-low);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.25;
		}

		&.icon {
			border-color: var(--color-base);
		}

		&.primary {
			background-color: var(--color-ultra-high);
			color: var(--color-ultra-low);

			:global(svg) {
				fill: var(--color-base);
			}

			&:hover:not(:disabled),
			&:active:not(:disabled),
			&.active:not(:disabled),
			&:focus:not(:disabled) {
				background-color: var(--color-accent);
			}

			&:disabled {
				cursor: not-allowed;
				opacity: 0.25;
			}
		}

		&.overlay {
			background-color: rgba(var(--color-accent-rgb), 0.5);
			color: var(--color-ultra-low);

			:global(svg) {
				fill: var(--color-base);
			}

			&:hover:not(:disabled),
			&:active:not(:disabled),
			&.active:not(:disabled),
			&:focus:not(:disabled) {
				background-color: var(--color-accent);
			}

			&:disabled {
				cursor: not-allowed;
				opacity: 0.25;
			}
		}

		&.ghost {
			background-color: transparent;
			border-color: transparent;
			color: var(--color-ultra-high);

			:global(svg) {
				fill: var(--color-ultra-high);
			}

			&:hover:not(:disabled),
			&:active:not(:disabled),
			&.active:not(:disabled),
			&:focus:not(:disabled) {
				background-color: var(--color-low);
			}

			&:disabled {
				cursor: not-allowed;
				opacity: 0.25;
			}
		}
	}
</style>
