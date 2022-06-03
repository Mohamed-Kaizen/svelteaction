export interface Position {
	x: number
	y: number
}

export interface RenderableComponent {
	/**
	 * The element that the component should be rendered as
	 *
	 * @default 'div'
	 */
	as?: Record<string, unknown> | string
}

export type PointerType = "mouse" | "touch" | "pen"
