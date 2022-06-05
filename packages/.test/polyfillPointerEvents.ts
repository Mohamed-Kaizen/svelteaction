// polyfill for jsdom (https://github.com/jsdom/jsdom/pull/2666)
if (!global.PointerEvent) {
	class PointerEvent extends MouseEvent {
		public pointerId?: number

		constructor(type: string, params: PointerEventInit = {}) {
			super(type, params)
			this.pointerId = params.pointerId
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	global.PointerEvent = PointerEvent as any
}

export {}
