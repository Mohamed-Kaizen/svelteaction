import { count } from "."

const users = [
	{
		created_at: "2022-05-10T20:32:38.874261+00:00",
	},
	{
		created_at: "2022-05-14T11:30:07.584793+00:00",
	},
	{
		created_at: "2022-05-15T15:05:24.811989+00:00",
	},
	{
		created_at: "2022-05-18T13:18:10.273899+00:00",
	},
	{
		created_at: "2022-05-18T16:05:07.485777+00:00",
	},
	{
		created_at: "2022-05-20T15:13:49.203725+00:00",
	},
	{
		created_at: "2022-05-21T14:55:31.822366+00:00",
	},
	{
		created_at: "2022-05-23T17:59:44.849638+00:00",
	},
	{
		created_at: "2022-05-27T17:02:56.749582+00:00",
	},
	{
		created_at: "2022-05-27T21:19:32.256549+00:00",
	},
	{
		created_at: "2022-05-28T05:32:04.583327+00:00",
	},
	{
		created_at: "2022-05-28T14:27:33.022032+00:00",
	},
	{
		created_at: "2022-06-02T14:44:41.557033+00:00",
	},
	{
		created_at: "2022-06-02T14:44:55.742143+00:00",
	},
	{
		created_at: "2022-06-02T18:04:56.589007+00:00",
	},
	{
		created_at: "2022-06-03T07:58:16.741883+00:00",
	},
	{
		created_at: "2022-06-04T18:36:03.694191+00:00",
	},
	{
		created_at: "2022-06-16T20:50:43.471265+00:00",
	},
	{
		created_at: "2022-07-05T21:51:06.075143+00:00",
	},
	{
		created_at: "2022-07-14T12:32:29.766779+00:00",
	},
	{
		created_at: "2022-07-25T17:24:13.054888+00:00",
	},
	{
		created_at: "2022-08-05T06:02:42.675728+00:00",
	},
	{
		created_at: "2022-08-14T19:05:48.191314+00:00",
	},
	{
		created_at: "2022-08-18T10:54:29.575153+00:00",
	},
	{
		created_at: "2022-08-19T06:49:07.094164+00:00",
	},
	{
		created_at: "2022-08-22T14:01:10.779457+00:00",
	},
	{
		created_at: "2022-08-22T16:30:19.160812+00:00",
	},
	{
		created_at: "2022-08-23T04:28:56.734932+00:00",
	},
	{
		created_at: "2022-08-23T06:22:11.957047+00:00",
	},
	{
		created_at: "2022-08-24T04:25:21.34245+00:00",
	},
	{
		created_at: "2022-08-24T09:30:05.950457+00:00",
	},
	{
		created_at: "2022-08-24T11:58:52.389551+00:00",
	},
	{
		created_at: "2022-08-26T13:38:20.446936+00:00",
	},
	{
		created_at: "2022-08-28T13:56:49.461323+00:00",
	},
	{
		created_at: "2022-08-30T16:58:55.890723+00:00",
	},
	{
		created_at: "2022-09-01T18:35:01.729395+00:00",
	},
	{
		created_at: "2022-09-06T08:31:23.359738+00:00",
	},
	{
		created_at: "2021-09-06T08:31:23.359738+00:00",
	},
]

describe("count", () => {
	it("should be defined", () => {
		expect(count).toBeDefined()
	})

	it("should work with daily user", () => {
		const dailyUser = users.filter((user) => {
			const [date] = user.created_at.split("T")

			user.created_at = date
			return true
		})

		expect(count(dailyUser, (u) => u.created_at)).toEqual({
			"2021-09-06": 1,
			"2022-05-10": 1,
			"2022-05-14": 1,
			"2022-05-15": 1,
			"2022-05-18": 2,
			"2022-05-20": 1,
			"2022-05-21": 1,
			"2022-05-23": 1,
			"2022-05-27": 2,
			"2022-05-28": 2,
			"2022-06-02": 3,
			"2022-06-03": 1,
			"2022-06-04": 1,
			"2022-06-16": 1,
			"2022-07-05": 1,
			"2022-07-14": 1,
			"2022-07-25": 1,
			"2022-08-05": 1,
			"2022-08-14": 1,
			"2022-08-18": 1,
			"2022-08-19": 1,
			"2022-08-22": 2,
			"2022-08-23": 2,
			"2022-08-24": 3,
			"2022-08-26": 1,
			"2022-08-28": 1,
			"2022-08-30": 1,
			"2022-09-01": 1,
			"2022-09-06": 1,
		})
	})

	it("should work with monthly user", () => {
		const monthlyUser = users.filter((user) => {
			const [date] = user.created_at.split("T")

			user.created_at = date.split("-").slice(0, 2).join("-")
			return true
		})

		expect(count(monthlyUser, (u) => u.created_at)).toEqual({
			"2021-09": 1,
			"2022-05": 12,
			"2022-06": 6,
			"2022-07": 3,
			"2022-08": 14,
			"2022-09": 2,
		})
	})

	it("should work with yearly user", () => {
		const yearlyUser = users.filter((user) => {
			const [date] = user.created_at.split("T")

			user.created_at = date.split("-").slice(0, 1).join("-")
			return true
		})

		expect(count(yearlyUser, (u) => u.created_at)).toEqual({
			"2022": 37,
			"2021": 1,
		})
	})
})
