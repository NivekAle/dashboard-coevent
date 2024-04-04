export type EventType = {
	id: number
	title: string
	description: string
	expected_date: Date
	created_at: Date
	end_date: Date
	zip_dode: string
	location_number: string
	street: string
	country: string | null
	state: string | null
	area_of_the_place: string | null
	isPrivary: number
	id_organization: number
	category_id: number | null
}