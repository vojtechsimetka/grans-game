<script lang="ts">
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

	type Variant = 'primary' | 'secondary' | 'overlay'

	type Props = {
		class?: string | null
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

	type $$Props = AnchorElement | ButtonElement

	let {
		class: className,
		variant = 'secondary',
		active,
		href,
		type,
		role,
		...restProps
	} = $props<AnchorElement | ButtonElement>()

	let buttonElement = $state<HTMLButtonElement | HTMLAnchorElement>()
	let singleSVG = $state(false)

	// Check if the button contains a single SVG element in which case this is icon button
	$effect(() => {
		singleSVG = false

		if (buttonElement === undefined) return

		// Filter out comment nodes
		const nonCommentNodes = Array.from(buttonElement.childNodes).filter(
			(node) =>
				!(
					node.nodeType === Node.COMMENT_NODE ||
					(node.nodeType === Node.TEXT_NODE && node.textContent === '')
				),
		)

		// Check if the only non-comment node is an SVG element
		if (nonCommentNodes.length === 1 && nonCommentNodes[0] instanceof SVGElement) {
			singleSVG = true
		}
	})
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	bind:this={buttonElement}
	type={href ? undefined : type}
	role={role ?? href ? 'link' : 'button'}
	{href}
	class:icon={singleSVG}
	class:active
	class:variant
	class={`${variant} ${className}`}
	{...restProps}
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
>
	<slot />
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
		padding: var(--spacing-16);
		overflow-wrap: normal;
		cursor: pointer;
		display: inline-flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		margin-block: 0;
		gap: var(--spacing-8);
		white-space: nowrap;
		text-decoration: none;

		:global(svg) {
			fill: var(--color-ultra-high);
			width: 20px;
			height: 20px;
		}

		&:active:not(:disabled),
		&.active:not(:disabled) {
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

			&:active:not(:disabled),
			&.active:not(:disabled) {
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

			&:active:not(:disabled),
			&.active:not(:disabled) {
				background-color: var(--color-accent);
			}

			&:disabled {
				cursor: not-allowed;
				opacity: 0.25;
			}
		}
	}
</style>
