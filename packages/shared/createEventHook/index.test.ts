import { createEventHook } from "."

describe("createEventHook", () => {
	it("should be defined", () => {
		expect(createEventHook).toBeDefined()
	})

	it("should trigger event", () => {
		const myFunction = () => {
			const resultEvent = createEventHook<string>()
			const exec = () => resultEvent.trigger("Hello World")
			return {
				exec,
				onResult: resultEvent.on,
			}
		}

		const { exec, onResult } = myFunction()

		onResult((result) => {
			expect(result).toBe("Hello World")
		})
		exec()
	})

	it("should trigger event with payload", () => {
		const myFunction = () => {
			const resultEvent = createEventHook<string>()
			const exec = (payload: string) => resultEvent.trigger(payload)
			return {
				exec,
				onResult: resultEvent.on,
			}
		}

		const { exec, onResult } = myFunction()

		onResult((result) => {
			expect(result).toBe("Hello World")
		})

		exec("Hello World")
	})
})
