import { createSingletonPromise } from "."

describe("createSingletonPromise", () => {
	it("should be defined", () => {
		expect(createSingletonPromise).toBeDefined()
	})

	it("should create singleton as promise", () => {
		const myFunction = () => {
			const result = createSingletonPromise(() => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve("Hello World")
					}, 1000)
				})
			})
			return {
				result,
			}
		}

		const { result } = myFunction()

		expect(result()).toBeInstanceOf(Promise)
	})
})
