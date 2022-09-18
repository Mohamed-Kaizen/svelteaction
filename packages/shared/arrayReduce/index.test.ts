import { arrayReduce } from "."

describe("arrayReduce", () => {
	it("should be defined", () => {
		expect(arrayReduce).toBeDefined()
	})

	it("should work", () => {
		const result = arrayReduce([1, 2, 3, 4], (prev, curr) => prev + curr, 0)

		expect(result).toEqual(10)
	})

	it("should work with different type", () => {
		const result = arrayReduce(
			[1, 2, 3, 4],
			(prev, curr) => prev + curr.toString(),
			""
		)

		expect(result).toEqual("1234")
	})

	it("should work with empty array", () => {
		const result = arrayReduce([], (prev, curr) => prev + curr, 0)

		expect(result).toEqual(0)
	})

	it("should work with empty initial value", () => {
		const result = arrayReduce([1, 2, 3, 4], (prev, curr) => prev + curr)

		expect(result).toEqual(10)
	})
})
