export default function TelephoneFormat(phone: string | number): string {
	const cleaned = phone.toString().replace(/\D/g, "");
	const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

	if (match) {
		return `(${match[1]}) ${match[2]}-${match[3]}`;
	}

	return phone.toString();
}
