import { argsFlat, MaybeArgs } from "."

describe("argsFlat", () => {
	it("should be defined", () => {
		expect(argsFlat).toBeDefined()
	})

	it("should Work with numbers", () => {
		function test(...args: MaybeArgs<number>) {
			const result = argsFlat(args)
			expect(result).toEqual([1, 2, 3])
		}

		test(1, 2, 3)
	})

	it("should Work with strings", () => {
		function test(...args: MaybeArgs<string>) {
			const result = argsFlat(args)
			expect(result).toEqual(["svelte", "is", "so", "cool"])
		}

		test("svelte", "is", "so", "cool")
	})
})
